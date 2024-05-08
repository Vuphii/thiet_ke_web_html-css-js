$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop()){
            $('header').addClass('sticky');
        }else{
            $('header').removeClass('sticky');
        }
    })
});
function signup(){
	var a = document.getElementById('Username').value;
	var b = document.getElementById('Email');
	var c = document.getElementById('Phone').value;
	var d = document.getElementById('Style').value;
	//var c = $('#Phone').val();
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    
	var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    
    if(a!= "" && (filter.test(b.value)==true) && (vnf_regex.test(c)==true) && d!="music"){
	alert("Chúc mừng bạn! Đăng ký thành công ");
     }else {
		alert( "Vui lòng nhập đầy đủ và đúng cú pháp thông tin");
	 }

	}


