$(function() {
	// �꾩떆 �대�吏� 蹂댁씠湲�
	/*var img = $('img, source');
	img.each(function() {
		var src = $(this).attr('src');
		var newSrc = src.replace('/uploadfile', 'http://211.252.141.88/uploadfile');
		$(this).attr('src', newSrc);
	});*/
	
	
    // GNB Top Banner
    var cookie = {
        set: function(name, value, day) {
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(0, 0, 0, 0);
            document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/; SameSite=Lax;';
        },
        get: function(name) {
            var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value ? value[2] : null;
        },
        delete: function(name) {
            var date = new Date();
            document.cookie = name + '= ' + '; expires=' + date.toUTCString() + '; path=/';
        }
    }

    if (cookie.get('main_banner_' + GLOBAL.siteId) === 'blocked') {
        $('.top-banner, .m-top-banner').remove();
    }
    else{
    	$('.top-banner').show();
    }

    $('.top-banner .btn-close, .m-top-banner .banner-close a, .top-banner .btn-close, .m-top-banner .banner-close button').click(function() {
        if ($('#chkday').is(':checked') || $('#m-chkday').is(':checked')) {
            cookie.set('main_banner_' + GLOBAL.siteId, 'blocked', 1);
        }
        $('.top-banner, .m-top-banner').remove();

        return false;
    });

    //--------------------------------------------------------------------------------------------------
    var exLength = $('.exhibition-swiper-container .swiper-slide').length;
    
    var exhSwiper = new Swiper('.exhibition-swiper-container', {
        slidesPerView: 'auto',
        autoplayDisableOnInteraction: false,
        loop: exLength >= 4 ? true : false,
        autoplay: exLength >= 4 ? 4000 : false,
        speed: 800,
        //autoHeight: true,
        prevButton: '.tl-btn-prev',
        nextButton: '.tl-btn-next',
        keyboardControl: true,
    });
    
    if (exLength >= 4) {
        $('.main-section-2-tit .btn-pause').html('�щ씪�대뜑 �뺤�');
	    $('.main-section-2-tit .btn-pause').click(function() {
	        if ($(this).hasClass('playing')) {
				exhSwiper.startAutoplay();
				$(this).html('�щ씪�대뜑 �뺤�');
			} else {
				exhSwiper.stopAutoplay();
				$(this).html('�щ씪�대뜑 �ъ깮');
			}
	        $(this).toggleClass('playing');
	        return false;
	    });
    } else {
    	$('.main-section-2-tit .btn-pause').css({cursor: 'default', opacity: 0.3});
    	$('.main-section-2-tit .btn-pause').click(function() {
	        return false;
	    });
    }

    //�щ씪�대뱶 �대�吏� 留덉슦�� �ㅻ쾭
    $('.main-section-2 .swiper-slide > a').mouseenter(function() {
        gsap.to( $('.over-cont', this.parentNode), {duration: 0.3, opacity: 1} );
    }).mouseleave(function() {
        gsap.to( $('.over-cont', this.parentNode), {duration: 0.3, opacity: 0} );
    });
    //�ъ빱��
    //$('.main-section-2 .swiper-slide > a').focus(function() {
    //    gsap.to( $('.over-cont', this.parentNode), {duration: 0.3, opacity: 1} );
    //}).blur(function() {
    //    gsap.to( $('.over-cont', this.parentNode), {duration: 0.3, opacity: 0} );
    //});

    // Visual Banners
    var visualNum = $('.visual-swiper-container .swiper-wrapper .swiper-slide').length;
    var visualMenu = ['Slide 1', 'Slide 2']
    var isAutoPlayVisual = true;
    var visualSwiper = new Swiper('.visual-swiper-container', {
        slidesPerView: 1,
        autoplayDisableOnInteraction: false,
        loop: visualNum > 1 ? true : false,
        autoplay: visualNum > 1 ? 5000 : false,
        speed: 1200,
        prevButton: '.tr-btn-prev',
        nextButton: '.tr-btn-next',
        pagination: '.visual-pagination .swiper-pagination .pagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
          return '<a href="javascript:;" class="swiper-pagination-bullet">' + (className + 1) + '</a>';
        },
        onInit: function(swiper) {
            if ($('.visual-swiper-container .swiper-slide-active .video-area').length > 0) {
                var video = document.querySelector('.visual-swiper-container .swiper-slide-active .video-area video');
                setTimeout(function() {
                	playVideo(video);
                }, 500);
            }
        }
    });
    if (visualNum > 1) {
		//$('.visual-swiper-container .pagination .swiper-pagination-bullet').attr('tabindex','0');
		$('.visual-pagination .controller .btn-pause').html('�щ씪�대뜑 �뺤�');
	    $('.visual-pagination .controller .btn-pause').click(function() {
	    	if ($(this).hasClass('playing')) {
				visualSwiper.startAutoplay();
		        $(this).html('�щ씪�대뜑 �뺤�');
			} else {
				visualSwiper.stopAutoplay();
		        $(this).html('�щ씪�대뜑 �ъ깮');
			}
	        isAutoPlayVisual = !isAutoPlayVisual;
	        $(this).toggleClass('playing');
	        return false;
	    });
    } else {
    	$('.visual-pagination, .tr-btn-next, .tr-btn-prev').hide();
    }
    

    var videos = document.querySelectorAll('.video-area video');
    visualSwiper.on('onSlideChangeEnd', function() {
        if ($('.visual-swiper-container .swiper-slide-active .video-area').length > 0) {
            var video = document.querySelector('.visual-swiper-container .swiper-slide-active .video-area video');
            playVideo(video);
        }
        // �꾩옱 �щ씪�대뱶媛� 鍮꾨뵒�ㅺ� �꾨땺 寃쎌슦
        else {
            //
        }
    });
    visualSwiper.on('onSlideChangeStart', function() {
    	var vLength = videos.length;
    	for (var i=0; i<vLength; i++) {
    		videos[i].currentTime = 0;
    		videos[i].pause();
    	}
    });

    function playVideo(vid) {
        if (isAutoPlayVisual) visualSwiper.stopAutoplay();
        vid.play();
        vid.addEventListener('ended', function() {
            vid.currentTime = 0;
            if (isAutoPlayVisual) {
                visualSwiper.slideNext();
                visualSwiper.startAutoplay();
            }
        });
    }
    
    // IE 踰꾧렇 �고쉶(�몃옖�ㅽ뤌�곸슜�� �섎━癒쇳듃 overflow:hidden �곸슜 �덈릺�� �꾩긽)
    var ua = window.navigator.userAgent;
    if (ua.indexOf('MSIE') >= 0 || ua.indexOf('Trident') >= 0) {
    	$('.visual-swiper-container .swiper-wrapper').css({opacity: 0.9999});
    }
    //

    //22-01-25 �뚮┰�덈떎 �щ씪�대뱶 �섏젙
    var noticeSwiper = new Swiper('.notice-swiper-container', {
        speed: 1000,
        spaceBetween: 1,
        loop: true,
        autoplay: 3000,
		autoplayDisableOnInteraction:false,
		disableOnInteraction: false,
        pagination: '.notice-pagination .swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function(swiper, current) {
        	return '<a href="javascript:void(0);" class="swiper-pagination-bullet">' + (current+1) + '</a>'
        }
    });


    //22-01-25 �뚮┰�덈떎 �щ씪�대뱶 �섏젙 - old
    $('.notice-swiper-container .btn-pause').html('�щ씪�대뜑 �뺤�');
    $('.notice-swiper-container .btn-pause').click(function() {
        if ($(this).hasClass('playing')) {
            noticeSwiper.startAutoplay();
            $(this).html('�щ씪�대뜑 �뺤�');
        } else {
            noticeSwiper.stopAutoplay();
            $(this).html('�щ씪�대뜑 �ъ깮');
        }
        $(this).toggleClass('playing');
        return false;
    });
    
    $('.notice-swiper-container .swiper-wrapper').click(function(){
	    noticeSwiper.stopAutoplay();
	    $('.notice-swiper-container .btn-pause').html('�щ씪�대뜑 �뺤�');
	    $('.notice-swiper-container .btn-pause').removeClass('playing');
    })

  //-------------------------------------------------------------------------------------------------------------------
    // Window Resize
    //-------------------------------------------------------------------------------------------------------------------
    var PHONE_WIDTH = 768;
    var TABLET_WIDTH = 992;
    var oldWidth = window.innerWidth;
    $(window).resize(function() {
        var winWidth = window.innerWidth;
        /*
         * Phone
         */
        if (winWidth < PHONE_WIDTH) {
            if (oldWidth >= PHONE_WIDTH && oldWidth < TABLET_WIDTH) { // �쒕툝由우뿉�� �몃뱶�곗쑝濡� 蹂�寃�
                //
            } else if (oldWidth >= TABLET_WIDTH) { // PC�먯꽌 �몃뱶�곗쑝濡� 蹂�寃�
            	stopVideo();
            }
        }
        /*
         * Tablet
         */
        else if (winWidth >= PHONE_WIDTH && winWidth < TABLET_WIDTH) {
            if (oldWidth < PHONE_WIDTH) { // �몃뱶�곗뿉�� �쒕툝由우쑝濡� 蹂�寃�
                //
            } else if (oldWidth >= TABLET_WIDTH) { // PC�먯꽌 �쒕툝由우쑝濡� 蹂�寃�
            	stopVideo();
            }
        }
        /*
         * PC
         */
        else if (winWidth >= TABLET_WIDTH) {
            if (oldWidth < PHONE_WIDTH) { // �몃뱶�곗뿉�� PC濡� 蹂�寃�
            	playVideo();
            } else if (oldWidth < TABLET_WIDTH && oldWidth >= PHONE_WIDTH) { // �쒕툝由우뿉�� PC濡� 蹂�寃�
            	playVideo();
            }
        }
        /*
         * All Device
         */
        oldWidth = window.innerWidth;

    }).trigger('resize');
    
    function stopVideo() {
    	if ($('.visual-swiper-container .swiper-slide-active .video-area').length > 0) {
            var video = document.querySelector('.visual-swiper-container .swiper-slide-active .video-area video');
            video.currentTime = 0;
    		video.pause();
        }
    }
    function playVideo() {
    	if ($('.visual-swiper-container .swiper-slide-active .video-area').length > 0) {
            var video = document.querySelector('.visual-swiper-container .swiper-slide-active .video-area video');
            video.currentTime = 0;
    		video.play();
        }
    }
    
});