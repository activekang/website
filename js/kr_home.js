$(function() {
	
    // 援먯쑁, �됱궗, �⑤씪�� �꾩떆愿�
    var eduSwiper = new Swiper('.edu-swiper-container', {
        slidesPerView: 1,
        autoplayDisableOnInteraction: false,
        loop: true,
        //autoplay: 4000,
        speed: 800,
        spaceBetween: 10,
        pagination: '.edu-content .bnrPage',
        paginationType: 'fraction',
        prevButton: '.edu-btn-prev',
        nextButton: '.edu-btn-next',
    });

    var eventSwiper = new Swiper('.event-swiper-container', {
        slidesPerView: 1,
        autoplayDisableOnInteraction: false,
        loop: true,
        //autoplay: 4000,
        speed: 800,
        spaceBetween: 10,
        pagination: '.event-content .bnrPage',
        paginationType: 'fraction',
        prevButton: '.event-btn-prev',
        nextButton: '.event-btn-next',
    });
    
    // �⑤씪�� �꾩떆愿� 諛� �ㅽ뒠�붿삤 紐� - �� �뺥깭 �ㅼ��댄띁
    var onlineFirstSwiper = new Swiper('.first-online-swiper-container', {
        slidesPerView: 1,
        autoplayDisableOnInteraction: false,
        loop: true,
        speed: 1000,
        spaceBetween: 10,
        pagination: '.bnrPage.online',
        paginationType: 'fraction',
        prevButton: '.online-btn-prev',
        nextButton: '.online-btn-next',
    });

    var onlineSecondSwiper = null;
    function setSecondSwiper() {
        onlineSecondSwiper = new Swiper('.second-online-swiper-container', {
            slidesPerView: 1,
            autoplayDisableOnInteraction: false,
            loop: true,
            speed: 1000,
            spaceBetween: 10,
            pagination: '.bnrPage.studio',
            paginationType: 'fraction',
            prevButton: '.online-btn-prev-2',
            nextButton: '.online-btn-next-2',
        });
    }

    $('.main-section-4 .tit-tab-type li a.tab').click(function() {
        var idx = $(this).parent().index();
        $('.main-tab-content .tab-area, .main-tab-content .tab-area .bnrPage').hide();
        $('.main-tab-content .tab-area').eq(idx).show();
        $('.main-tab-content .tab-area .pagination .pagination-area .bnrPage').eq(idx).show();
        if (idx === 1 && onlineSecondSwiper === null) {
            setSecondSwiper();
        }
        $('.main-section-4 .tit-tab-type li').removeClass('on');
        $(this.parentNode).addClass('on');
        return false;
    });
    
    
});