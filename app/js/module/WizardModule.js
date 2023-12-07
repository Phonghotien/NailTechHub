export default function WizardModule() {
  const wizard = document.querySelector(".wizard");
  if (wizard) {
    let wz_class = ".wizard";
    let args = {
      wz_class: wz_class,
      wz_nav_style: "dots",
      buttons: true,
    };

    const wizard = new Wizard(args);

    wizard.init();
  }
  const btnNotice = $(".hd-notice .icon");
  const body = document.getElementsByTagName("body")[0];

  if (btnNotice) {
    btnNotice.on("click", function (e) {
      e.stopPropagation();
      $(this).toggleClass("active");
      $(body).toggleClass("no-scroll");
    });
    $(document).mouseup(function (e) {
      if (
        !e.target.closest(".hd-notice .icon") &&
        !e.target.closest(".hd-notice-pos")
      ) {
        btnNotice.removeClass("active");
        $(body).removeClass("no-scroll");
      }
    });
  }
}
