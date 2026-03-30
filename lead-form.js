(function () {
  var modal = document.getElementById("lead-modal");
  if (!modal) return;

  var panel = modal.querySelector(".lead-modal__panel");
  var closeBtn = modal.querySelector(".lead-modal__close");
  var openBtns = document.querySelectorAll(".js-open-lead-form");
  var firstInput = modal.querySelector("input[name='Имя']");

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
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

  if (panel) {
    panel.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
})();
