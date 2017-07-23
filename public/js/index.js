/**
 * Created by jkwu on 17-7-22.
 */

$(function () {
  var $loginBox = $('#loginBox');
  var $registerBox = $('#registerBox');
  var $userInfo = $('#userInfo');
  var $logout = $('#logout');

  // 切换到注册页面
  $loginBox.find('a.colMint').on('click', function () {
    $registerBox.show();
    $loginBox.hide();
  });

  // 切换到登录页面
  $registerBox.find('a.colMint').on('click', function () {
    $registerBox.hide();
    $loginBox.show();
  });

  //注册
  $registerBox.find('button').on('click', function () {
    //通过ajax进行数据的提交
    $.ajax({
      type: 'post',
      url: '/api/user/register',
      data: {
        username: $registerBox.find('[name="username"]').val(),
        password: $registerBox.find('[name="password"]').val(),
        repassword: $registerBox.find('[name="repassword"]').val(),
      },
      dataType: 'json',
      success: function (result) {
        console.log(result);
        $registerBox.find('.colWarning').html(result.message);
        if (!result.code) {
          //注册成功
          setTimeout(function () {
            $loginBox.show();
            // $loginBox.find('[name="username"]').html($registerBox.find('[name="username"]').val());
            // $loginBox.find('[name="password"]').html($registerBox.find('[name="password"]').val());
            $registerBox.hide();
          }, 1000);
        }
      }
    })
  });

  //登录
  $loginBox.find('button').on('click', function () {
    //通过ajax进行数据的提交
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      data: {
        username: $loginBox.find('[name="username"]').val(),
        password: $loginBox.find('[name="password"]').val()
      },
      dataType: 'json',
      success: function (result) {
        console.log(result);
        // $userInfo.find('.colDark').html(result.message);
        if (!result.code) {
          //登录成功
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      }
    })
  });

  //退出
  $logout.on('click', function () {
    //通过ajax进行数据的提交
    $.ajax({
      type: 'get',
      url: '/api/user/logout',
      success: function (result) {
        if (!result.code) {
          window.location.reload();
        }
      }
    })
  })
});