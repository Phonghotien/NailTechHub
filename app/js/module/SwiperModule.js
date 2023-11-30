export default function SwiperModule() {
  function functionSlider(element, customizeOption, typePagi) {
    const swiperSlider = document.querySelectorAll(element);
    if (swiperSlider) {
      swiperSlider.forEach((item) => {
        const swiper = item.querySelector(".swiper");
        const pagi = item.querySelector(".swiper-pagination");
        const next = item.querySelector(".swiper-next");
        const prev = item.querySelector(".swiper-prev");
        if (!typePagi) {
          typePagi = "bullets";
        }
        var slide = new Swiper(swiper, {
          watchSlidesProgress: true,
          pagination: {
            el: pagi,
            type: typePagi,
            clickable: true,
          },
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
          fadeEffect: {
            crossFade: true,
          },
          ...customizeOption,
        });
      });
    }
  }

  functionSlider(".element", {
    speed: 1200,
    autoplay: {
      delaY: 5000,
    },
    // slidesPerGroup: 2,
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    spaceBetween: 24,
    effect: "slide",
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        freeMode: true,
      },
      500: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  functionSlider(".pro-slider", {
    speed: 1200,
    autoplay: true,
    // slidesPerGroup: 2,
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    spaceBetween: 0,
    effect: "slide",
    slidesPerView: "auto",
  });
  functionSlider(".hmenu-slider", {
    speed: 1200,
    autoplay: false,
    // slidesPerGroup: 2,
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    spaceBetween: 0,
    effect: "slide",
    slidesPerView: "auto",
  });
  functionSlider(".hreci-slider", {
    speed: 1200,
    autoplay: true,
    // slidesPerGroup: 2,
    initialSlide: 0,
    centeredSlides: false,
    spaceBetween: 0,
    effect: "slide",
    slidesPerView: "auto",
    loop: true,
    autoplay: true,
    breakpoints: {
      0: {
        centeredSlides: true,
      },
      1261: {
        centeredSlides: false,
      },
    },
  });
  functionSlider(".hhot-slider", {
    speed: 1200,
    // slidesPerGroup: 2,
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    spaceBetween: 0,
    effect: "slide",
    slidesPerView: "auto",
    autoplay: true,
  });
  functionSlider(".ins-slider", {
    speed: 1200,
    // slidesPerGroup: 2,
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    spaceBetween: 0,
    effect: "slide",
    slidesPerView: "auto",
    autoplay: true,
  });

  function checkScreenWidth() {
    var screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (screenWidth < 1200) {
      functionSlider(".blogdt-slider", {
        speed: 1200,
        // slidesPerGroup: 2,
        initialSlide: 0,
        centeredSlides: false,
        loop: false,
        spaceBetween: 0,
        effect: "slide",
        slidesPerView: "auto",
        loop: false,
        autoplay: true,
        rewind: true,
      });
    }
  }
  window.addEventListener("resize", checkScreenWidth);
  window.addEventListener("load", checkScreenWidth);
  functionSlider(".preci-slider", {
    // slidesPerGroup: 2,
    speed: 1000,
    effect: "coverflow",
    grabCursor: true,
    parallax: true,
    centeredSlides: true,
    spaceBetween: 12,
    autoplay: true,

    coverflowEffect: {
      rotate: 0.05,
      depth: 0,
      stretch: 0,
      modifier: 1,
      slideShadows: !1,
    },

    on: {
      init: function (e) {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find(".preci-image .inner")
            .attr({
              "data-swiper-parallax": 0.9 * swiper.width,
              "data-swiper-paralalx-opacity": 0.1,
            });
        }
        let index = swiper.activeIndex;
      },
      resize: function () {
        this.update();
      },
    },
  });
  const bannerSliders = document.querySelectorAll(".bnh-slider");
  if (bannerSliders) {
    bannerSliders.forEach((item) => {
      const swiperMain = item.querySelector(".bnh-main .swiper");
      var bannerSliderMain = new Swiper(swiperMain, {
        slidesPerView: 1,
        spaceBetween: 0,
        // loopedSlides: 6,
        loop: false,
        autoplay: false,
        speed: 1000,
        effect: "coverflow",
        grabCursor: true,
        parallax: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0.05,
          depth: 0,
          stretch: 0,
          modifier: 1,
          slideShadows: !1,
        },
        on: {
          init: function (e) {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              $(swiper.slides[i])
                .find(".bnh-image .inner")
                .attr({
                  "data-swiper-parallax": 0.9 * swiper.width,
                  "data-swiper-paralalx-opacity": 0.1,
                });
            }
            let index = swiper.activeIndex;
          },
          resize: function () {
            this.update();
          },
        },
      });
    });
  }

  // Slider Control
  // topsSliderMain.controller.control = topSliderThumb;
  // topSliderThumb.controller.control = topsSliderMain;
}
