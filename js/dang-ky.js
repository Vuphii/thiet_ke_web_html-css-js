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

	
//doi tuong validator
function Validator(options){

    function getParent(elemnet, selector){
        while(elemnet.parentElement){
            if(elemnet.parentElement.matches(selector)){
                return elemnet.parentElement;
            }
            elemnet = elemnet.parentElement;

        }
    }

    //console.log(options.form);
        var formElement = document.querySelector(options.form);

    
        //console.log(options.rules); 

        var selectorRules = {};
        //ham thuc hien
        function validate(inputElement, rule){
            //var errorMessage = rule.test(inputElement.value);
            var errorMessage;
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
            //var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
// lay ra cac rule cua selsetor
            var rules = selectorRules[rule.selector];
            // lap qua tung rules
            //neu co loi thi dung viec kiem tra 
            for ( var i = 0; i < rules.length; ++i){
                switch (inputElement.type){
                    case 'radio':
                    case 'checkbox':
                        errorMessage = rules[i](
                            formElement.querySelector(rule.selector + ':checked')
                        );
                        console.log(errorMessage);

                        break;

                    default:  
                        errorMessage = rules[i](inputElement.value);
  
                }
                if(errorMessage) break;
            }
            //console.log(rules);

                        //console.log(errorMessage);
                        if(errorMessage){
                                errorElement.innerText = errorMessage;
                               getParent(inputElement, options.formGroupSelector).classList.add('invalid');
                                

                        } else{
                            errorElement.innerText = '';
                           getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                            //console.log('Không thể tìm thấy phần tử lỗi.');

                        }

                        return !errorMessage;
             
        }

        if(formElement){
            //khi submit form 
           formElement.onsubmit = function (e){
                e.preventDefault();

                var isFormValid  = true; 
//thuc hien lap qua tuf rule
                options.rules.forEach(function (rule){
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement, rule);
                    if(!isValid){
                        isFormValid = false;
                    }

                });
                 
         
                if(isFormValid){
                    //truong hop submit voi js
                    if(typeof options.onSubmit === 'function'){
                        var enableInputs =formElement.querySelectorAll('[name]');
                        var formValues = Array.from(enableInputs).reduce(function(values, input){

                            //values[input.name] = input.value;
                            switch(input.type){

                                case 'radio':
                                    if(input.checked){
                                        values[input.name] = input.value;
                                     }else{
                                     values[input.name] = input.value && values[input.name];   
                                     }
                                    break;
                                case 'checkbox':
                                    if(!input.matches(':checked')){
                                        if(!Array.isArray(values[input.name])){
                                            values[input.name]='';
                                        }
                                        return values;
                                    }
                                    if(!Array.isArray(values[input.name])){
                                        values[input.name] = [];
                                    }
                                    values[input.name].push(input.value);
                                    break;
                                case 'file':
                                    values[input.name] = input.files;
                                    break;
                                    
                                default:
                                    values[input.name] = input.value;


                            }
                            return values;
    
                    }, {});
                
                    options.onSubmit(formValues);

                    }
                    //tuong hop oi hanh vi mac dinh
                    else{
                        formElement.submit();
                    } 
                
                }
            }
            options.rules.forEach(function (rule){
                // luu lai cac rule cho cac rule

                if (Array.isArray(selectorRules[rule.selector])){
                    selectorRules[rule.selector].push(rule.test);
                }else{
                    selectorRules[rule.selector] = [rule.test];
                }
                    //console.log(selectorRules[rule.selector]);
                //selectorRules[rule.selector] = rule.test;

                var inputElements = formElement.querySelectorAll(rule.selector);

                Array.from(inputElements).forEach(function (inputElement){
                    if(inputElement){
                        // xu li truong blur ra khoi input
                        inputElement.onblur = function (){
                            //console.log(rule);
                            validate(inputElement, rule);
                            
                        }
                        // xu li moi khi nguoi dung nhap input
                        inputElement.oninput = function(){
                        var errorElement =getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                        errorElement.innerText = '';
                       getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
       
                        }
                    }
                        
                });

                

               
                
            });
            console.log(selectorRules);
        }
};
//ding nghia rules
//nguyen tac cua cac rules
//1. kho co loi ==> tra ra message loi
//2. khi hop le ==> kho tra ra cai gi 

Validator.isRequired = function(selector, message){
    return {
          selector: selector,
          test: function (value){
            return value ? undefined: message || 'Vui long nhap hop le'

          } 
    };

};

Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined: message || 'truong nay phai la email';

        }
    }
};

Validator.isPhone = function(selector, message){
    return {
          selector: selector,
          test: function (value){
			var regex = /^09\d{8}$/;
           return regex.test(value) ? undefined: message ||`vui long nhap dung dinh dang so dien thoai `;
            // return value.trim() ? undefined: 'Vui long nhap hop le'

          } 
    };

};

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return{
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined: message || 'gia tri nhap vao khong dung ';
        }
    }
}


