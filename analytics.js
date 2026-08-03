/**
 * Google Analytics 4 + click tracking for gooru portfolio.
 * 1) Create property: https://analytics.google.com/ → Admin → Data stream → Web
 * 2) Paste Measurement ID below (looks like G-XXXXXXXXXX)
 * 3) Push / wait ~1 min → open Realtime in GA to verify
 */
(function () {
  var GA_MEASUREMENT_ID = ""; // e.g. "G-XXXXXXXXXX"

  if (!GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });

  function track(name, params) {
    if (typeof gtag !== "function") return;
    gtag("event", name, params || {});
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
