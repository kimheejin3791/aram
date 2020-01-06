$(document).ready(function () {
    var scrollT;
    var timer = 0;
    var $gnb = $('#gnb');
 
    $(window).on('scroll', function () {
      clearTimeout(timer);
  
      setTimeout(function () {
        scrollT = $(this).scrollTop();

      }, 50);
    });
  
    //메뉴열기 클릭
    $('.btn_menu').on('click', function () {
      if ($(this).hasClass('active')) { //닫기
        $gnb.stop().animate({top: '-100%'}, 1000, function () {
          $(this).css({visibility: 'hidden'}).find('ul li.on').removeClass('on').children('ul').stop().slideUp();
        });
  
        $(this).removeClass('active').find('.sr-only').text('메뉴 열기');
      } else {    //열기
        var scrollMove = scrollT;  //click시 스크롤을 저장
        console.log(scrollMove);
  
        $(this).addClass('active').find('.sr-only').text('메뉴 닫기');
  
        var $first = $gnb.find('[data-link="first"]');
        var $last = $gnb.find('[data-link="last"]');
  
        $gnb.css({visibility: 'visible'}).stop().animate({top: 0}, 1000, function () {
          $first.focus();   //대상 엘리먼트에 포커스를 강제로 이동
        });
  
        //첫번째 a 태그에서 shift+tab을 눌러 header의 영역으로 포커스가 이동하지 못하게 제한
        $first.on('keydown', function (e) {
          console.log(e.keyCode);   //tab을 클릭하면 9를 반환
          if ( e.shiftKey && e.keyCode == 9) {
            e.preventDefault();   //포커스 이동을 강제로 제한
            $last.focus();        //처음 포커스로 이동, #gnbWrap을 벗어나지 않고 순환됨
          }
        });
        //마지막 버튼 태그에서 tab을 눌러 container의 영역으로 포커스가 이동하지 못하게 제한
        $last.on('keydown', function (e) {
          if ( !e.shiftKey && e.keyCode == 9) {
            e.preventDefault();
            $('.btn_menu').focus();
          }
        });
  
      }
    });
  });