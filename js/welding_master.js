
var urlParams = new URLSearchParams(window.location.search);
var phone_id = urlParams.get('phone_id');
  var current_user_id =  localStorage.getItem("ls_uid") ;
var current_user_name =  localStorage.getItem("ls_uname") ; 
 
$(document).ready(function(){

 


//   $("#menu_bar").load('menu.html',
//     function() { 
//       var lo = (window.location.pathname.split("/").pop());
//       var web_addr = "#"+ (lo.substring(0, lo.indexOf(".")))
 
    
//      if($(web_addr).find("a").hasClass('nav-link'))
//      {
//       $(web_addr).find("a").toggleClass('active')
//      }
//      else if($(web_addr).find("a").hasClass('dropdown-item'))
// {
// $(web_addr).parent().parent().find("a").eq(0).toggleClass('active')
// }
      
     
//     }
//  );




    // check_login();
    
//    $("#unamed").text(localStorage.getItem("ls_uname"))  
$("#requirement_type").addClass("d-none")
      $(".pipe").hide()
      $(".rod").hide()
      $(".sheet").hide()
  
      

      $('#create_machine').on('click', function()
      {
       
       $("#machine_modal").modal('show');
      
      });
   
      $('#create_group').on('click', function()
      {
       
       $("#group_modal").modal('show');
      
      });
      $('#Material_type').change(function() {
     
     
      
        if($('#Material_type').find(':selected').val() == "Sheet")
        {
        
            $(".pipe").hide()
            $(".rod").hide()
            $(".sheet").show()
        }else if($('#Material_type').find(':selected').val() == "Rod")
            {
            
                $(".pipe").hide()
                $(".rod").show()
                $(".sheet").hide()
            }
            else if($('#Material_type').find(':selected').val() == "Pipe")
                {
                
                    $(".pipe").show()
                    $(".rod").hide()
                    $(".sheet").hide()
                }
         });
   

         $('#sample_btn').on('click', function()
         {
          
          $("#sample_modal").modal('show');
         
         });

   
 
});










  

   



function check_login()
{
 
if (localStorage.getItem("logemail") == null && phone_id == null )  {
 window.location.replace("login.html");
}
else if (localStorage.getItem("logemail") == null && phone_id != null )
 {
get_current_userid_byphoneid();
$('#menu_bar').hide()
 }

 else
 {
     
 }
}


function get_current_userid_byphoneid()
   {
     $.ajax({
       url: "php/get_current_employee_id_byphoneid.php",
       type: "get", //send it through get method
       data: {
         phone_id:phone_id,
        
      
      },
       success: function (response) {
      
      
      if (response.trim() != "error") {
       var obj = JSON.parse(response);
      

      console.log(response);
      
      
       obj.forEach(function (obj) {
         current_user_id = obj.emp_id;
         current_user_name =  obj.emp_name;
       });
      
    
      }
      
      else {
       salert("Error", "User ", "error");
      }
      
      
         
       },
       error: function (xhr) {
           //Do Something to handle error
       }
      });
   }

  
   function shw_toast(title,des,theme)
   {
   
     
         $('.toast-title').text(title);
         $('.toast-description').text(des);
   var toast = new bootstrap.Toast($('#myToast'));
   toast.show();
   }  

   function get_millis(t)
   {
    
    var dt = new Date(t);
    return dt.getTime();
   }



   function get_cur_millis()
   {
    var dt = new Date();
    return dt.getTime();
   }


   function get_today_date(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var hour = date.getHours();
    var mins = date.getMinutes();
  
console.log(mins)

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
 
    var today = year + "-" + month + "-" + day +"T"+ hour + ":"+ mins; 
    return today;
   }

   function get_today_start_millis(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
 
    var today = year + "-" + month + "-" + day +"T00:00"; 

    return get_millis(today)
     
   }


   function get_today_end_millis(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
 
    var today = year + "-" + month + "-" + day +"T23:59"; 

    return get_millis(today)
     
   }

   function salert(title, text, icon) {
  

    swal({
        title: title,
        text: text,
        icon: icon,
    });
}



function millis_to_date( millis)
{
  var d = new Date(millis); // Parameter should be long value

  
return d.toLocaleString('en-GB');

}