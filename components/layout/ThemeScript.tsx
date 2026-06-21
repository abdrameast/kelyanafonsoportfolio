/**
 * Inline script injected before hydration to set the colour theme with no
 * flash of the wrong colours (FOUC). Mirrors the logic in ThemeProvider.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t?(t==='dark'||(t==='system'&&m)):m;var r=document.documentElement;if(dark){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
