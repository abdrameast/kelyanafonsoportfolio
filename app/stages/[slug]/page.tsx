import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStage, stages } from "@/data/stages";
import { site } from "@/data/site";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudyContent } from "@/components/case-studies/CaseStudyContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return stages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const stage = getStage(params.slug);
  if (!stage) return {};
  const company = stage.company.split(" —")[0];
  const title = `${stage.title} — Stage ${stage.code}`;
  const description = `${stage.tagline} ${company}, ${stage.location}. Rapport de stage complet (${stage.pages} pages), consultable intégralement.`;
  const cover = stage.gallery[0];
  return {
    title,
    description,
    alternates: { canonical: `/stages/${stage.slug}` },
    openGraph: {
      type: "article",
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}/stages/${stage.slug}`,
      images: [
        {
          url: cover.src,
          width: cover.width,
          height: cover.height,
          alt: cover.alt,
        },
      ],
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const stage = getStage(params.slug);
  if (!stage) notFound();

  return (
    <>
      <CaseStudyHero stage={stage} />
      <CaseStudyContent stage={stage} />
    </>
  );
}
