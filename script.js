// ハンバーガーボタン
$('.burger-btn').on('click',function(){
  $('.burger-btn').toggleClass('close');
  $('.nav-wrapper').fadeToggle(500);
  $('body').toggleClass('noscroll');
});

$('a[href^="#form"]').click(function() {
  // スクロールの速度
  let speed = 400; // ミリ秒で記述
  let href = $(this).attr("href");
  let target = $(href == "#" || href == "" ? 'html' : href);
  let position = target.offset().top;
  $('body,html').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});

// Swiper
var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 55,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    reverseDirection: false
  },
});

AOS.init({
	offset: 100,
  duration: 1000,
  easing: 'ease',
  delay: 500,
  once: false,
  anchorPlacement: 'bottom-bottom',
});

// よくある質問 アコーディオン
$(function () {
  // $('.ac-child').css("display", "none");
  $(".ac-child:not(:first-of-type)").css("display", "none");
  $(".ac-parent:first-of-type").toggleClass('open');
  $('.ac-parent').on('click', function () {
     //openクラスをつける
     $(this).toggleClass('open', 800);
     //クリックされていないac-parentのopenクラスを取る
     $(".ac-parent").not(this).removeClass("open");
 
     $(this).next().slideToggle();
     $('.ac-parent').not($(this)).next('.ac-child').slideUp();
  })
});


// プライバシーポリシーにチェックがないと送信できない
const $submitBtn = $('#js-submit')
$('#form input,#form textarea').on('change', function () {
  if (
    $('#form input[type="text"]').val() !== "" &&
    $('#form input[type="email"]').val() !== "" &&
    $('#form input[type="checkbox"]').val() !== "" &&
    $('#form #privacyCheck').prop('checked') === true
  ) {
    $submitBtn.prop('disabled', false);

  } else {
    $submitBtn.prop('disabled', true);
  }
});


// 送信後の動き
$('#form').submit(function (event) {
  var formData = $('#form').serialize();
  $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeBOlToarKsSUTetik-VzPEPaqJSH482YUgFEDOfhyiguWV6g/formResponse",
    data: formData,
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        $(".end-message").slideDown();
        $(".form-btn").fadeOut();
        // window.location.href = "thanks.html";
      },
      200: function () {
        $(".false-message").slideDown();
      }
    }
  });
  event.preventDefault();
});
