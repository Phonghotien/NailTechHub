export default function AosModule() {
  AOS.init({
    startEvent: "DOMContentLoaded",
    offset: 0,
    duration: 1200,
    delay: "200",
    easing: "ease",
    once: true,
    mirror: true,
    disable: function () {
      return $(window).width() <= 768;
    },
  });
  //   const road = document.querySelector(".preci-road");
  //   const video = document.querySelector("#preci-road-ytb video");
  //   let srcVideo = "";
  //   if (video) {
  //     srcVideo = video.src;
  //   }

  //   if (road) {
  //     road.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       road.classList.remove("is-pause");
  //       road.classList.add("is-play");
  //       setTimeout(() => {
  //         road.classList.add("is-play-second");
  //         setTimeout(() => {
  //           road.classList.add("is-play-third");
  //           video.play();
  //         });
  //       }, 0);
  //     });
  //   }
}
