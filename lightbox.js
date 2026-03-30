(function () {
  var box = document.getElementById("lightbox");
  if (!box) return;

  var imgEl = box.querySelector(".lightbox__img");
  var btnPrev = box.querySelector(".lightbox__nav--prev");
  var btnNext = box.querySelector(".lightbox__nav--next");
  var btnClose = box.querySelector(".lightbox__close");

  var urls = [];
  var index = 0;
  var touchStartX = 0;

  function updateNav() {
    if (!btnPrev || !btnNext) return;
    var single = urls.length <= 1;
    btnPrev.disabled = single;
    btnNext.disabled = single;
  }

  function render() {
    if (!urls.length || !imgEl) return;
    imgEl.src = urls[index];
    updateNav();
  }

  function open(startUrls, startIndex) {
    urls = startUrls.slice();
    index = Math.max(0, Math.min(startIndex || 0, urls.length - 1));
    box.hidden = false;
    document.body.style.overflow = "hidden";
    render();
    if (btnClose) btnClose.focus();
  }

  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
    if (imgEl) imgEl.removeAttribute("src");
    urls = [];
  }

  function prev() {
    if (!urls.length) return;
    index = (index - 1 + urls.length) % urls.length;
    render();
  }

  function next() {
    if (!urls.length) return;
    index = (index + 1) % urls.length;
    render();
  }

  if (btnPrev) btnPrev.addEventListener("click", function (e) { e.stopPropagation(); prev(); });
  if (btnNext) btnNext.addEventListener("click", function (e) { e.stopPropagation(); next(); });
  if (btnClose) btnClose.addEventListener("click", function (e) { e.stopPropagation(); close(); });

  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });

  document.addEventListener("keydown", function (e) {
    var vm = document.getElementById("video-modal");
    if (vm && !vm.hidden) return;
    if (box.hidden) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  });

  box.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  box.addEventListener(
    "touchend",
    function (e) {
      var x = e.changedTouches[0].screenX;
      var dx = x - touchStartX;
      if (dx < -48) next();
      else if (dx > 48) prev();
    },
    { passive: true }
  );

  document.querySelectorAll("[data-carousel][data-lightbox]").forEach(function (carousel) {
    var slides = carousel.querySelectorAll(".media-carousel__slide img");
    var list = Array.prototype.map.call(slides, function (el) {
      return el.getAttribute("src") || el.src;
    });

    slides.forEach(function (image, i) {
      image.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        open(list, i);
      });
    });
  });

  document.querySelectorAll("[data-lightbox-single]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var img = el.querySelector("img");
      var src = img ? img.getAttribute("src") || img.src : el.getAttribute("data-lightbox-src");
      if (src) open([src], 0);
    });
  });
})();
