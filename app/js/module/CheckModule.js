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
  //   let selectedOrder = [];

  //   // Lắng nghe sự kiện khi checkbox thay đổi
  //   $(".recheck-input").change(function () {
  //     updateOrder();
  //   });

  //   // Cập nhật thứ tự và hiển thị thông tin
  //   function updateOrder() {
  //     selectedOrder = [];
  //     $(".recheck-input:checked").each(function (index) {
  //       selectedOrder.push(index + 1);
  //     });

  //     $(".subus-sls-it").each(function (index) {
  //       const orderInfo = $(this).closest(".igr").find(".order-info");
  //       console.log(orderInfo);
  //       if (selectedOrder.includes(index + 1)) {
  //         orderInfo.text(
  //           " - Chọn thứ tự: " + (selectedOrder.indexOf(index + 1) + 1)
  //         );
  //       } else {
  //         orderInfo.text("");
  //       }
  //     });
  //   }
  //   var checkboxes = document.querySelectorAll(".subus-sls .recheck-input");
  //   var selectedOrder = [];

  //   checkboxes.forEach(function (checkbox) {
  //     checkbox.addEventListener("change", function () {
  //       updateOrder();
  //     });
  //   });

  //   function updateOrder() {
  //     // Mảng chứa các đơn đặt hàng được chọn
  //     selectedOrder = [];

  //     // Lặp qua tất cả các ô đánh dấu
  //     checkboxes.forEach(function (cb, index) {
  //       // Nếu ô đánh dấu được chọn, thêm chỉ số của nó vào mảng selectedOrder
  //       if (cb.checked) {
  //         selectedOrder.push(index + 1);
  //       }
  //     });

  //     // Lặp qua tất cả các ô đánh dấu một lần nữa để cập nhật hoặc thêm thông tin về đơn đặt hàng
  //     checkboxes.forEach(function (cb, index) {
  //       // Tìm phần tử "span" với lớp "order" trong phần tử cha của ô đánh dấu
  //       var orderSpan = cb.parentElement.querySelector(".order");

  //       // Nếu đã có phần tử "span" với lớp "order"
  //       if (orderSpan) {
  //         // Cập nhật nội dung của phần tử "span" dựa trên việc ô đánh dấu có được chọn hay không
  //         orderSpan.innerText = cb.checked
  //           ? selectedOrder.indexOf(index + 1) + 1
  //           : "";
  //         console.log("run");
  //       } else {
  //         // Nếu không có phần tử "span" với lớp "order", tạo một phần tử "span" mới
  //         orderSpan = document.createElement("span");
  //         orderSpan.className = "order";
  //         // Đặt nội dung của phần tử "span" dựa trên việc ô đánh dấu có được chọn hay không
  //         orderSpan.innerText = cb.checked
  //           ? selectedOrder.indexOf(index + 1) + 1
  //           : "";
  //         // Thêm phần tử "span" vào phần tử cha của ô đánh dấu
  //         cb.parentElement.appendChild(orderSpan);
  //         console.log("run2");
  //       }
  //     });
  //   }
}
