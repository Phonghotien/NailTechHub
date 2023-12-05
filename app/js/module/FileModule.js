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
}
