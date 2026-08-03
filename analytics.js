/**
 * Click tracking on top of the official gtag snippet in <head>.
 * Measurement ID: G-QQHY5TNCYT
 */
(function () {
  function track(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest("a");
      if (!a || !a.href) return;

      var href = a.getAttribute("href") || "";
      var label = (a.textContent || "").trim().slice(0, 80);

      if (href.indexOf("mailto:") === 0) {
        track("cta_click", { event_category: "cta", event_label: "email", link_url: href });
        return;
      }
      if (href.indexOf("portfolio.pdf") !== -1 || href.indexOf("portfolio-en.pdf") !== -1) {
        track("file_download", { event_category: "download", event_label: label || "pdf", link_url: href });
        return;
      }
      if (a.host && a.host !== location.host) {
        track("outbound_click", {
          event_category: "outbound",
          event_label: label || a.host,
          link_url: a.href,
          link_domain: a.host,
        });
        return;
      }
      if (href.indexOf("interiors") !== -1 || href.indexOf("lifestyle") !== -1) {
        track("internal_nav", { event_category: "nav", event_label: label || href, link_url: href });
      }
    },
    true
  );
})();
