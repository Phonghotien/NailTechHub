export default function SearchModule() {
  const hdSIcon = document.querySelector(".hd-icon-search");
  const hdSForm = document.querySelector(".re-search");
  let isOpen = false;
  if (hdSIcon) {
    hdSIcon.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        hdSForm.classList.add("open");
      } else {
        hdSForm.classList.remove("open");
      }
    });
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".hd-icon-search") &&
        !e.target.closest(".re-search")
      ) {
        isOpen = false;
        hdSForm.classList.remove("open");
      }
    });
  }
  $(".acc-ctrs-js .icon").on("click", function (event) {
    //  var myDiv = $(this).closest(".acc-ctrs-js");
    $(".acc-ctrs-js").removeClass("open");
    var myDiv = $(this).closest(".acc-ctrs-js");
    myDiv.addClass("open");
  });

  // Sự kiện click cho toàn bộ trang để xoá class 'open' khi click ra ngoài
  $(document).on("click", function (event) {
    var target = $(event.target);
    if (
      !target.closest(".acc-ctrs-js").length &&
      !target.hasClass(".acc-ctrs-pos")
    ) {
      $(".acc-ctrs-js").removeClass("open");
    }
  });
}
