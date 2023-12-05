export default function CheckModule() {
  const reCheckBlocks = document.querySelectorAll(".recheck-block");
  if (reCheckBlocks) {
    reCheckBlocks.forEach((item) => {
      const recheckItems = item.querySelectorAll(".recheck-item");
      if (recheckItems) {
        recheckItems.forEach((item) => {
          const input = item.querySelector(".recheck-input");
          if (input.checked) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }
  document.addEventListener("click", (e) => {
    const reCheckBlock = e.target.closest(".recheck-block");
    const reCheckItem = e.target.closest(".recheck-item");
    var event = new Event("change");
    if (reCheckBlock) {
      const reCheckItems = reCheckBlock.querySelectorAll(".recheck-item");
      const reCheckInputs = reCheckBlock.querySelectorAll(".recheck-input");

      if (reCheckItem) {
        const input = reCheckItem.querySelector(".recheck-input");
        if (input.type == "radio") {
          reCheckItems.forEach((item) => {
            item.classList.remove("active");
          });
          reCheckInputs.forEach((item) => {
            item.checked = false;
          });
          input.checked = true;
          if (input.checked == true) {
            reCheckItem.classList.add("active");
          }
          input.dispatchEvent(event);
          $(input).trigger("change");
        }
        if (input.type == "checkbox") {
          if (input.checked == true) {
            input.checked = false;
            reCheckItem.classList.remove("active");
          } else {
            input.checked = true;
            reCheckItem.classList.add("active");
          }
          input.dispatchEvent(event);
          $(input).trigger("change");
        }
      }
    }
  });
  let selectedOrder = [];

  // Lắng nghe sự kiện khi checkbox thay đổi
  $(".recheck-input").change(function () {
    updateOrder();
  });

  // Cập nhật thứ tự và hiển thị thông tin
  function updateOrder() {
    selectedOrder = [];
    $(".recheck-input:checked").each(function (index) {
      selectedOrder.push(index + 1);
    });

    $(".subus-sls-it").each(function (index) {
      const orderInfo = $(this).closest(".igr").find(".order-info");
      console.log(orderInfo);
      if (selectedOrder.includes(index + 1)) {
        orderInfo.text(
          " - Chọn thứ tự: " + (selectedOrder.indexOf(index + 1) + 1)
        );
      } else {
        orderInfo.text("");
      }
    });
  }
}
