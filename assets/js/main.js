/* =========================================================
   Maria Florentin · Weinsommelière — interactions
   ========================================================= */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const progress = document.getElementById("scrollProgress");

  /* ---- Sticky nav state + scroll progress ---- */
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("is-scrolled", y > 20);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progress.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  function closeMenu() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü öffnen");
  }
  navToggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el, i) {
      // subtle stagger for siblings
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Current year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form (client-side validation + faux submit) ---- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  function setError(field, hasError) {
    const wrap = field.closest(".field");
    if (wrap) wrap.classList.toggle("has-error", hasError);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form__note";
      note.textContent = "";

      const name = form.elements["name"];
      const email = form.elements["email"];
      const occasion = form.elements["occasion"];

      let valid = true;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      [name, email, occasion].forEach(function (f) {
        const ok = f === email ? emailOk : !!f.value.trim();
        setError(f, !ok);
        if (!ok) valid = false;
      });

      const t = (window.i18n && window.i18n.t) ? window.i18n.t : function (k) { return k; };

      if (!valid) {
        note.classList.add("is-error");
        note.textContent = t("form.err");
        return;
      }

      // No backend in this static build — simulate a successful submission.
      const btn = form.querySelector("button[type=submit]");
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = t("form.sending");

      setTimeout(function () {
        form.reset();
        btn.disabled = false;
        btn.textContent = label;
        note.classList.add("is-success");
        note.textContent = t("form.success");
      }, 900);
    });

    // clear error state as the user types
    form.addEventListener("input", function (e) {
      if (e.target.closest(".field")) setError(e.target, false);
    });
  }
})();
