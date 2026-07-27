(function () {
  var KEY = "gooru-theme";
  var root = document.documentElement;

  function preferred() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function themeLabel(theme) {
    if (window.GooruI18n && typeof window.GooruI18n.t === "function") {
      return theme === "dark"
        ? window.GooruI18n.t("themeLight")
        : window.GooruI18n.t("themeDark");
    }
    var lang = (root.getAttribute("data-lang") || root.lang || "uk").toLowerCase();
    if (lang.indexOf("de") === 0) return theme === "dark" ? "Hell" : "Dunkel";
    if (lang.indexOf("pl") === 0) return theme === "dark" ? "Jasny" : "Ciemny";
    if (lang.indexOf("sk") === 0) return theme === "dark" ? "Svetlá" : "Tmavá";
    if (lang.indexOf("en") === 0) return theme === "dark" ? "Light" : "Dark";
    return theme === "dark" ? "Світла" : "Темна";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = themeLabel(theme);
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  window.GooruTheme = {
    apply: apply,
    refreshLabel: function () {
      apply(root.getAttribute("data-theme") || preferred());
    },
  };

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme") || preferred());
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      apply(next);
    });
  });
})();
