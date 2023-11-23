$(document).ready(function() {

    // MENU


    function setMenu() {

        let searchIcon = $('#header-search-icon');
        let cartIcon = $('#header-cart-icon');
        let cartCross = $('#cart-cross');
        let navMenuCross = $('#header-nav-menu-cross');
        let burger = $('#burger');
        let navMenu = $('#header-nav-menu');
        let cart = $('#cart');

        burger.click(() => navMenu.addClass('header-nav-menu-show'));
        navMenuCross.click(() => navMenu.removeClass('header-nav-menu-show'));
        searchIcon.click(() => $('#header-search-form').toggle(100));
        cartIcon.click(() => cart.addClass('show-cart'));
        cartCross.click(() => cart.removeClass('show-cart'));
    }

    setMenu();



    // SLIDER


    function setSlider() {
        let sliderWrapper = $('#slider-wrapper');
        let slider = $('#slider');
        let leftBtn = $('#slider-arrow-left');
        let rightBtn = $('#slider-arrow-right');
        let slideWidth = Math.round($('#slider-wrapper').eq(0).width());
        let translateSliderWidth = -slideWidth;
        let slide = 0;
        let n = 0;
        let sliderText = $('.slider-text');

        function moveSlider() {
            slider.css({ transform: 'translateX(' + translateSliderWidth + 'px)' });
            translateSliderWidth -= slideWidth;
        }

        function moveRight() {
            if (translateSliderWidth <= -slideWidth * 3 || translateSliderWidth >= 0) {
                slide = 0;
                translateSliderWidth = 0;
            }
            moveSlider();
            slide++;
        }


        function moveLeft() {
            if (translateSliderWidth >= -slideWidth || translateSliderWidth >= 0) {
                slide = 0;
                return translateSliderWidth = -slideWidth;
            }
            translateSliderWidth += slideWidth * 2;
            moveSlider();
            slide--;
        }

        leftBtn.click(moveLeft);
        rightBtn.click(moveRight);

        /*	let runSliderInterval=setInterval(moveRight,4000);

        sliderWrapper.hover(()=>clearInterval(runSliderInterval),
        ()=>runSliderInterval=setInterval(moveRight,3000));*/
    }







    // GALLERY

    function setGallery() {

        let galleryImgs = $('#gallery figure img');
        let viewImg = $('#gallery-img-view img');
        let view = $('#gallery-img-view');
        let galleryBg = $('#background');
        let galleryCross = $('#gallery-cross');
        let leftBtn = $('#gallery-arrow-left');
        let rightBtn = $('#gallery-arrow-right');


        function showGalleryView(e) {
            let imgAttr = $(e.target).attr('src');
            viewImg.attr('src', '' + imgAttr);
            view.fadeIn(300);
            galleryBg.show();
        }

        function closeGalleryView() {
            view.fadeOut(300);
            galleryBg.hide();
        }

        function switchImgs(direction) {

            let newImgAttr = direction === 'left' ? $(`#gallery figure img[src="${$('#gallery-img-view img').attr('src')}"]`).parent().prev().children().attr('src') : $(`#gallery figure img[src="${$('#gallery-img-view img').attr('src')}"]`).parent().next().children().attr('src');

            if (newImgAttr !== undefined) {
                viewImg.attr('src', '' + newImgAttr);
            }
        }

        galleryImgs.click(showGalleryView);
        galleryCross.click(closeGalleryView);

        leftBtn.click(() => switchImgs('left'));
        rightBtn.click(switchImgs);
    }








    // BLOGS TABS

    function setCategories() {
        let categories = $('#blogs-categories ul li');

        function switchCategories(e) {
            $('.active').removeClass('active');
            $(`.blog-item-${$(e.target.closest('li')).attr("id")}`).addClass('active');
        }
        categories.click(switchCategories);
    }


    function setBlogPages() {
        let blogPages = $('#switch-pages a');

        function switchBlogPages(e) {
            $('.active-switch-pages').removeClass('active-switch-pages');
            $(e.target).addClass('active-switch-pages');
        }

        blogPages.click(switchBlogPages);
    }







    // COUNTER

    function setCounter() {

        function counter(n1, n2, n3, n4) {
            let time = 5000;
            let step = 4;
            let num = 0;
            let elements = Array.from($('.counter-value'));
            let t = Math.round(time / n1 / step)

            elements.forEach(function(item, index) {

                let int = setInterval(function() {
                    num += step;
                    if (index === 0 && num >= n1 || index === 1 && num >= n2 || index === 2 && num >= n3 || index === 3 && num >= n4) {
                        clearInterval(int);
                    }
                    item.innerHTML = num;
                }, t)
            });
        }

        let counterBlock = $('#counter')[0];

        console.log(counterBlock)
        let options = {
            rootMargin: '0px 0px 0px 0px',
        };

        let callback = (entries, observer) => {
            console.log(entries)
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('INTERSECTION')
                    counter(800, 400, 564, 128);
                }
            })
        }

        let observer = new IntersectionObserver(callback, options);
        observer.observe(counterBlock);
    }




    function runFunctions() {

        let pageName = document.querySelector('.wrapper').getAttribute('id');

        if (pageName === 'index-wrapper') {
            setSlider();
            setGallery();
        } else if (pageName === 'wrapper-about-us') {
            setGallery();
            setCounter();
        } else if (pageName === 'blog-wrapper') {
            setCategories();
            setBlogPages();
        }
    }

    runFunctions();
})