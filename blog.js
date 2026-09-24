(function () {
  "use strict";

  var html = document.documentElement;
  var themeButton = document.getElementById("theme-toggle");

  // Keep the translation in the source while the blog is English-only.
  // Old links with ?lang=zh also open the current English edition.
  html.lang = "en";
  document.querySelectorAll("[data-lang]").forEach(function (element) {
    element.hidden = element.dataset.lang !== "en";
  });
  if (document.body.dataset.titleEn) document.title = document.body.dataset.titleEn;

  var url = new URL(window.location.href);
  if (url.searchParams.has("lang") || /-zh-CN$/.test(url.hash)) {
    url.searchParams.delete("lang");
    url.hash = url.hash.replace(/-zh-CN$/, "-en");
    history.replaceState(null, "", url);
  }

  function updateThemeLabel() {
    if (!themeButton) return;
    themeButton.setAttribute("aria-label", html.dataset.theme === "dark"
      ? "Switch to light mode" : "Switch to dark mode");
  }

  function renderMath() {
    if (!window.renderMathInElement) return;
    document.querySelectorAll(".article-body:not([hidden])").forEach(function (body) {
      if (body.dataset.typeset) return;
      window.renderMathInElement(body, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false,
        strict: false
      });
      body.dataset.typeset = "true";
    });
    document.querySelectorAll(".article-body:not([hidden]) .equation").forEach(function (equation) {
      // Make horizontally overflowing formulas reachable with the keyboard.
      if (equation.scrollWidth > equation.clientWidth + 1) {
        equation.tabIndex = 0;
        equation.setAttribute("role", "region");
        equation.setAttribute("aria-label", "Scrollable equation");
      } else {
        equation.removeAttribute("tabindex");
        equation.removeAttribute("role");
        equation.removeAttribute("aria-label");
      }
    });
  }

  if (themeButton) themeButton.addEventListener("click", function () {
    var theme = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = theme;
    try { localStorage.setItem("site-theme", theme); } catch (error) { /* Storage is optional. */ }
    updateThemeLabel();
  });

  window.addEventListener("resize", renderMath);
  updateThemeLabel();
  renderMath();
  if (document.fonts) document.fonts.ready.then(renderMath);
})();
