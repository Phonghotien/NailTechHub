export default function FileModule() {
  const inputUpload = document.querySelector(".upload-image");
  let loadFile = function (event) {
    let image = document.querySelector(".preview-img img");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.srcset = URL.createObjectURL(event.target.files[0]);
  };
  if (inputUpload) {
    inputUpload.addEventListener("change", loadFile);
  }
  $("#imageUpload").change(function () {
    readImgUrlAndPreview(this);
    function readImgUrlAndPreview(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#imagePreview").attr("src", e.target.result);
          $("#imagePreview").css("opacity", 1);
        };
      }
      reader.readAsDataURL(input.files[0]);
    }
  });
}
