$(function(){
  $('.button-more').on('mouseover', function(){
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    },100);
  });

  $('.button-more').on('mouseout', function(){
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0,
    },100);
  });

  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  $('#submit').on('click', function(event){// eventの中には、クリックした送信ボタン（#submit）に関する情報（オブジェクト）が入っています
    event.preventDefault();// formタグによるフォームの送信をキャンセルするメソッド　

    let result = inputCheck();
    let error = result.error;
    let message = result.message;
    if(error == false){
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result){
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text){
          alert('お問い合わせを送信できませんでした。')
        }
      })
    }else{
      alert(message);
    }
  });

  $('#name').blur(function () {
    inputCheck();
  });

  $('#furigana').blur(function () {
    inputCheck();
  });

  $('#email').blur(function () {
    inputCheck();
  });

  $('#tel').blur(function () {
    inputCheck();
  });

  $('#message').blur(function () {
    inputCheck();
  });

  $('#agree').click(function () {
    inputCheck();
  });

  function inputCheck(){
    let result;

    let message = '';
// エラーがなければfalse、エラーがあればtrue  
    let error = false;

    if($('#name').val() == ''){
      // 空ならば
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。 \n';
    }else{
      // 空でなければ
      $('#name').css('background-color', '#fafafa');
    }

    if($('#furigana').val() == ''){
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力して下さい。 \n';
    }else{
      $('#furigana').css('background-color', '#fafafa');
    }

    if($('#message').val() == ''){
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'メッセージを入力して下さい。 \n';
    }else{
      $('#message').css('background-color', '#fafafa');
    }

    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1 ){
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または[@] [.]が含まれていません。 \n';
    }else{
      $('#email').css('background-color', '#fafafa');
    }

    if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1){
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に[-]が含まれていません。 \n';
    }else{
      $('#tel').css('background-color', '#fafafa');
    }

    if($('#agree').prop('checked') == false){// #agreeの値にチェックが入っていなければ
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックして下さい。 \n';
    }

    if(error == true){
      $('#submit').attr('src', 'images/button-submit.png');
    }else{
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    result = {// ???
      error: error,
      message: message
    }
    return result;
  }
});
// 一度送信ボタンを押さないと青くならないけどいいのか