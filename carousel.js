(function () {
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var viewport = root.querySelector(".media-carousel__viewport");
    var prev = root.querySelector(".media-carousel__btn--prev");
    var next = root.querySelector(".media-carousel__btn--next");
    if (!viewport || !prev || !next) return;

    function step() {
      return viewport.clientWidth || 1;
    }

    function maxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function goPrev() {
      var w = step();
      var x = viewport.scrollLeft;
      if (x <= 1) {
        viewport.scrollTo({ left: maxScroll(), behavior: "smooth" });
      } else {
        viewport.scrollBy({ left: -w, behavior: "smooth" });
      }
    }

    function goNext() {
      var w = step();
      var x = viewport.scrollLeft;
      if (x >= maxScroll() - 1) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        viewport.scrollBy({ left: w, behavior: "smooth" });
      }
    }

    prev.addEventListener("click", function () {
      goPrev();
    });

    next.addEventListener("click", function () {
      goNext();
    });

    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    });
  });
})();
