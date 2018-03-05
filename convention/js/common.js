// 콘솔 출력 기능이 없는 웹브라우저에서 콘솔 로그를 피함
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // methods 배열 변수에서 정의하지 않은 남은 부분의 method 변수값 처리
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// 추가적인 함수들은 하단 부터 추가
var scrolling = false,
ts = null;

$('body').on('touchstart.scrollable', '.a', function(e) {
  // Only execute the below code once at a time
  if (!scrolling) {
    scrolling = true;
    if (e.currentTarget.scrollTop === 0) {
      e.currentTarget.scrollTop = 1;
    } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
      e.currentTarget.scrollTop -= 1;
    }
    scrolling = false;
  }
  ts = e.originalEvent.touches[0].clientY;
});

$('body').on('touchmove.scrollable', '.a', function(e) {
  //If there is no scrollabe content we disable default event
  var te = e.originalEvent.changedTouches[0].clientY,
      direction = ts > te ? 'down' : 'up';


  $container = $('.a');
  $content = $('.b');

  if ($content.height() <= $container.height()) {
      e.preventDefault();
    console.log('Default prevented');
  } else if ($container.scrollTop() <= 1 && direction == 'up') {
      e.preventDefault();
    console.log('Default prevented');
  } else if ($container.scrollTop() > 0 && ($container.scrollTop() + $container.height() >= $content.height() - 1) && direction == 'down') {
      e.preventDefault();
    console.log('Default prevented');
  }
});

$(function () {

	// header 전체메뉴 열고닫기
	//GNB 메뉴 롤오버
	$(".gnb_depth1 > li").mouseover(function(){
		$(".gnb_depth2").slideDown(350);
	});
	//GNB 메뉴 아웃
	$('.header_inner').mouseleave(function() {
		$(".gnb_depth2").slideUp(350);
	});

	// FAQ 열고/닫기 (아코디언 기본 none/block)
	$('.accordion li a').on('click', function () {
		if (!$(this).parent().hasClass('curr')){
			$('.accordion li.curr').removeClass('curr');
			$(this).parent().addClass('curr');
		} else {
			$(this).parent().removeClass('curr');
		}
	});

	// 아코디언 (animation)
	$('.accordion li a').on('click', function () {
		var index = $(this).parent().index();
		if (!$(this).parent().hasClass('curr')){
			$('.accordion li p').eq(index).slideDown(); // li 안에 내용 부분
			$(this).parent().removeClass('curr');
			$(this).parent().addClass('curr');
		} else {
			$('.accordion li p').eq(index).slideUp(); // li 안에 내용 부분
			$(this).parent().removeClass('curr');
		}
	});


	// 우측 Top버튼
	$('.btn_top a').on('click', function () {
		$('html, body').animate({'scrollTop':'0px'}, 500);
		$(document).animate({'scrollTop':'0px'}, 500);
	});

	// 탭 이동
	$('.tab_menu li').on('click', function () {
		var indx = $(this).index();
		$('.tab_box').css('display', 'none');
		$('.tab_box').eq(indx).css('display', 'block');
	});

	// lnb 탭이동 2depth, 활성화된 class에 view 추가
	$('.lnb > ul > li > a').on('click', function (){
		if (!$(this).parent().find('ul').is(':visible')){
			$('.lnb > ul > li.view').removeClass('view');
			$(this).parent().addClass('view');
		} else {
			$(this).parent().removeClass('view');
		}
	});

	// lnb 탭이동 3depth 활성화된 class에 on 추가
	$('.lnb > ul > li > ul > li > a').on('click', function (){
		var index = $(this).parent().index();
		if (!$(this).parent().find('ul').is(':visible')){
			$('.lnb > ul > li > ul > li.on').removeClass('on');
			$(this).parent().addClass('on');
		} else {
			$(this).parent().removeClass('on');
		}
	});

	// input 디자인 
	$('.chk_img span').on('click',function(){
		if(! $(this).parent().hasClass('on') ){
			$('.chk_img').addClass('on');
			$('.chk_img input').attr('checked',true);
		}else{
			$('.chk_img').removeClass('on');
			$('.chk_img input').attr('checked',false);
		}


	});
	// 레이어팝업
		$('.layer_btn').on('click',function() {
				openLayer('layer_pop');
			});

		$('.layer_close').on('click',function() {
				closeLayer('layer_pop');
			});

		$('.layer_btn2').on('click',function() {
			openLayer('layer_pop2');
		});
		$('.layer_btn3').on('click',function() {
				openLayer('layer_pop3');
			});

		$('.layer_close').on('click', function() {
			closeLayer('layer_pop2')
			closeLayer('layer_pop3')
		})






	// 레이어 팝업 열기
	function openLayer(class_name) {
		
		$(document.body).append('<div class=\'dim\'></div>');
		$('.dim').css('width', '100%');
		$('.dim').css('top', '0');
		$('.dim').css('opacity', '0.8');
		$('.dim').css('background', '#000');
		$('.dim').css('z-index', '100');
		$('.dim').css('height', document.body.scrollHeight)
		$('.dim').css('display', 'block');
	 
		$('.'+class_name).css('display', 'block');
		$('.'+class_name).css('z-index', '200');
		$('.'+class_name).css('position', 'fixed');	
		$('.'+class_name).css('top', '50%');
		$('.'+class_name).css('left', '50%');
		$('.'+class_name).css('margin-top', -1*parseInt($('.'+class_name).outerHeight()/2));
		$('.'+class_name).css('margin-left', -1*parseInt($('.'+class_name).outerWidth()/2));
	}
	 
	// 레이어 팝업 닫기
	function closeLayer(class_name) {
		$('.'+class_name).css('display', 'none');
		$('.dim').css('display', 'none');
		$('.dim').remove();
	}



});