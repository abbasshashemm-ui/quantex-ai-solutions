export const THEME_STORAGE_KEY = "quantex-theme";

export type Theme = "light" | "dark";

/** Colours for the browser's address bar, one per theme. */
export const THEME_COLOR: Record<Theme, string> = {
  light: "#e6e9ed",
  dark: "#0c0e12",
};

/**
 * Runs in the document head before first paint so the page never flashes the
 * wrong theme. A saved choice wins; otherwise the device setting decides, and
 * with neither the site is light.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;
