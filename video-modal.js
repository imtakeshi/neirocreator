(function () {
  var modal = document.getElementById("video-modal");
  if (!modal) return;

  var video = modal.querySelector(".video-modal__video");
  var closeBtn = modal.querySelector(".video-modal__close");
  if (!video) return;

  function openModal(src) {
    if (!src) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    video.src = src;
    video.play().catch(function () {});
  }

  function closeModal() {
    video.pause();
    video.removeAttribute("src");
    video.load();
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-video-src]").forEach(function (el) {
    function activate() {
      openModal(el.getAttribute("data-video-src"));
    }

    el.addEventListener("click", function (e) {
      e.preventDefault();
      activate();
    });

    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeModal();
    });
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (!modal.hidden && e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  });
})();
