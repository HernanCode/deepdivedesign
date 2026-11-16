/* coSIMULATION · shared behaviours: idioma CA/ES + nav scroll + menú móvil */
(function () {
  "use strict";
  var KEY = "cosim-lang";
  var lang = "ca";
  try { lang = localStorage.getItem(KEY) || "ca"; } catch (e) {}
  if (lang !== "ca" && lang !== "es") lang = "ca";

  function apply(l) {
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    document.documentElement.setAttribute("lang", l);
    document.querySelectorAll("[data-ca]").forEach(function (el) {
      var t = el.getAttribute("data-" + l);
      if (t !== null) el.textContent = t;
    });
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lang-btn") === l);
    });
  }

  document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-lang-btn")); });
  });

  var nav = document.querySelector(".site-nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var mob = document.querySelector(".site-mobile");
  if (mob) {
    mob.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mob.removeAttribute("open"); });
    });
  }

  /* páginas .pg: reveal escalonado */
  document.documentElement.classList.add("js");
  if (document.body.classList.contains("pg")) {
    var rv = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      rv.forEach(function (el) { io.observe(el); });
    } else {
      rv.forEach(function (el) { el.classList.add("in"); });
    }
  }

  apply(lang);
})();
