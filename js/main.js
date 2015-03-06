var pages = {
    Welcome : {pageUrl : 'home.html', default: true},
    "Our Macarons" :{pageUrl: 'macarons.html'},
    "Gifts & Parties" : {pageUrl: 'gifts-parties.html'},
    Contact : {pageUrl : 'contact.html'}
};

$('document').ready(function() {
   
    /*$('.main-nav li a').each(function() {    
        $(this).click(function() {
            var my_page = pages[$(this).text()];
            console.log(my_page);
            loadPage(my_page.pageUrl);
            
    
        });
    });*/
    
    create_menu();
});

function create_menu(){
    var main_nav_ul = $(".main-nav ul");
    for(var index in pages){
        var li = $("<li/>");
        var a = $("<a/>").text(index);
        (function(){
            var my_index = index;
            li.on("click","a",function(){
                var my_page = pages[my_index];
                loadPage(my_page.pageUrl);
            });
        })();
        li.append(a);
        main_nav_ul.append(li);
        if(pages[index].default==true){
            loadPage(pages[index].pageUrl);
        }
    }
}

function loadPage(page_url) {
       $.get(page_url, function(data) {
            $('#main_content').html(data);
           
       });
}

function validate_contact() {
    var contact_inputs = $('#contact_form input, #contact_form textarea');
    var error_count = 0;
    
    $('#contact_form .error_msg').remove();
    
    contact_inputs.each(function(){
        var str ='';
        var regex = '';
        var error_msg = '';
        
        switch($(this).attr('name')) {
         case 'name': 
            str = $(this).val();
            regex = /[a-zA-Z]{3,}/;
            error_msg = " Must be at least 3 characters long, no numbers or characters";
            break;
         case 'email': 
            str = $(this).val();
            regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            error_msg = " Must be a valid email";
            break;
         case 'phone': 
            str = $(this).val();
            regex = /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/;
            error_msg = " Must be a valid 10 digit phone number";
            break;                
         case 'subject': 
            str = $(this).val();
            regex = /.{3,50}/;
            error_msg = " Subject must be at least 3 and at most 250 characters or less";
            break;
         case 'comments': 
            str = $(this).val();
            regex = /.{3,250}/;
            error_msg = " Comments can only be between 3 and 250 characters";
            break;
                
            default:
        }
        if(regex !== null) {
        if(str.match(regex) === null) {
            var error_span = $('<span/>').addClass('error_msg').text(error_msg);
            error_span.insertAfter($(this));
            error_count++;
        }
        }
    });
    
    
    if(error_count==0) {

        send_message();
    }
    else {
     return false;   
    }   
}
var success_count = 0;
function send_message() {
    
    
    if(success_count == 0) {
    var successMessage = "Form successfuly submitted! You will be contacted shortly.";
    var success_span = $('<span/>').addClass('success_msg').text(successMessage);
    console.log(success_span);
    success_span.insertAfter('.btn');
    success_count++;
    }
    else {
     return false;   
    }
   
}