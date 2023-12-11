export default function QuhuModule() {
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
    // Pwd
    $(document).ready(function () {
        $(".seepassJS").on("click", function () {
            // console.log("show pass");
            const pwd = $(this).siblings('input');
            if (pwd.attr("type") == "password") {
                pwd.attr("type", "text");
                // console.log("show");
                // $(this).parent().addClass("show");
                $(this).removeClass("fa-eye");
                $(this).addClass("fa-eye-slash");
            } else {
                pwd.attr("type", "password");
                $(this).addClass("fa-eye");
                $(this).removeClass("fa-eye-slash");
            }
        });
    });
    // Scroll Content
    let offSet = 200;
    const anchorList = document.querySelector(".policy-list");
    if (anchorList) {
        const anchorLink = anchorList.querySelectorAll(".policy-list .policy-link");
        anchorLink.forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                scroll(anchor);
            });
        });
        window.addEventListener("scroll", function () {
            setActiveSidebarLink(anchorLink);
        });
        function scroll(anchor) {
            const sectionId = anchor.getAttribute("href");
            const headerOffset = offSet;
            const section = document.querySelector(sectionId);
            const sectionPosition =
                section.getBoundingClientRect().top + window.scrollY - headerOffset;

            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth"
            });
            //xóa active
            document.querySelectorAll(".policy-list .policy-link").forEach((link) => {
                link.classList.remove("active");
            });
            //thêm active
            anchor.classList.add("active");
        }
        function setActiveSidebarLink(anchorLink) {
            const scrollPosition = window.scrollY + offSet;

            document.querySelectorAll(".heading").forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute("id");

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    anchorLink.forEach((link) => {
                        link.classList.remove("active");
                    });
                    // link tương ứng
                    const currentLink = document.querySelector(
                        `.policy-list .policy-link[href="#${sectionId}"]`
                    );
                    if (currentLink) {
                        currentLink.classList.add("active");
                    }
                }
            });
        }
    }
    // button Active 
    const buttons = document.querySelectorAll('.buttons');
    if (buttons) {
        if (window.innerWidth < 800) {
            buttons.forEach(item => {
                item.addEventListener('click', () => {
                    centerButton(item)
                })
                if (item.classList.contains("active")) {
                    centerButton(item)
                }
                if (item.classList.contains("is-active")) {
                    centerButton(item)
                }
            })
            function centerButton(button) {
                const screenWidth = window.innerWidth;
                const buttonRect = button.getBoundingClientRect();
                const buttonCenter = buttonRect.left + buttonRect.width / 2;

                const scrollContainer = document.querySelector('.scrollContainer');
                const scrollAmount = buttonCenter - screenWidth / 2;
                scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });

                // const buttons = document.querySelectorAll('.partner-btn-item');
                // buttons.forEach((btn) => {
                //     btn.style.transform = 'scale(1)';
                // });

                // button.style.transform = 'scale(1.2)';
            }
        }
    }

    // about

    functionSlider(".ab-miss", {
        speed: 1600,
        autoplay: false,
        // slidesPerGroup: 2,
        initialSlide: 1,
        centeredSlides: true,
        loop: false,
        spaceBetween: 0,
        slidesPerView: "auto",
        //  allowTouchMove: false,
    });

    var swiperAbThumb = new Swiper(".ab-sl-thumb .swiper", {
        slidesPerView: "auto",
        spaceBetween: 0,
        allowTouchMove: false,
        pagination: {
            el: ".ab-sl-thumb .swiper-pagination",
            clickable: true,
        },
    });
    var swiperAbMain = new Swiper(".ab-sl-main .swiper", {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
            prevEl: ".ab-sl-main .swiper-prev",
            nextEl: ".ab-sl-main .swiper-next",
        },
        thumbs: {
            swiper: swiperAbThumb,
        }
    });
    // blog 
    const blogList = document.querySelector(".blog-list")
    if (blogList) {
        const btn = blogList.querySelector(".load-btn")
        const text = btn.querySelector(".text")
        btn.addEventListener('click', () => {
            if (text.textContent == "🡡") {
                blogList.classList.add("open")
            } else {
                blogList.classList.remove("open")
            }
        })
    }
    functionSlider(".blog-relate", {
        speed: 1600,
        autoplay: false,
        // slidesPerGroup: 2,
        initialSlide: 1,
        centeredSlides: true,
        loop: false,
        spaceBetween: 0,
        slidesPerView: "auto",
        //  allowTouchMove: false,
    });
    // next step
    const stepBlock = document.querySelector(".stepBlock");
    if (stepBlock) {
        // const prevTabBtn = stepBlock.querySelector(".prev-tab-btn");
        const nextTabBtn = stepBlock.querySelector(".next-tab-btn");
        const tabContent = stepBlock.querySelectorAll(".stepContent");

        tabContent.forEach((item) => {
            let currentTab = 0;

            const tabs = item.querySelectorAll(".step-content");

            function showTab(index) {
                tabs.forEach((tab, idx) => {
                    if (idx === index) {
                        tab.classList.add("active");
                        $(tab).slideDown();
                    } else {
                        tab.classList.remove("active");
                        $(tab).slideUp();
                    }
                });
            }
            function nextTab(e) {
                e.preventDefault();
                if (nextTabBtn.classList.contains("monaStepDisabled") || nextTabBtn.classList.contains("monaStepDisabledPro") || nextTabBtn.classList.contains("monaStepLast")) {
                    return;
                } else {
                    currentTab++;
                    if (currentTab < tabs.length - 1) {
                        showTab(currentTab);
                    } else {
                        nextTabBtn.querySelector(".inner-normal").textContent = 'Booking';
                        nextTabBtn.setAttribute("type","submit")
                        showTab(currentTab);
                    }
                }
            }

            function prevTab(e) {
                e.preventDefault();
                if (currentTab > 0) {
                    currentTab--;
                    showTab(currentTab);
                }
            }

            showTab(currentTab);
            nextTabBtn.addEventListener("click", nextTab);
            // prevTabBtn.addEventListener("click", prevTab);
        });
    }

}