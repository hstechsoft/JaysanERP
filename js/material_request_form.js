
var urlParams = new URLSearchParams(window.location.search);
var phone_id = urlParams.get('phone_id');
  var current_user_id =  localStorage.getItem("ls_uid") ;
var current_user_name =  localStorage.getItem("ls_uname") ; 
 var physical_stock_array = [];
$(document).ready(function(){
 
  
  $("#menu_bar").load('menu.html',
    function() { 
      var lo = (window.location.pathname.split("/").pop());
      var web_addr = "#"+ (lo.substring(0, lo.indexOf(".")))
 
    
     if($(web_addr).find("a").hasClass('nav-link'))
     {
      $(web_addr).find("a").toggleClass('active')
     }
     else if($(web_addr).find("a").hasClass('dropdown-item'))
{
$(web_addr).parent().parent().find("a").eq(0).toggleClass('active')
}
      
     
    }
 );



    check_login();
    
  $("#unamed").text(localStorage.getItem("ls_uname"))

 get_internal_godown();


 physical_stock_array = [];

physical_stock_array.push({
  godown_id: 1,
  qty: 10 
})


physical_stock_array.push({
  godown_id: 2,
  qty: 11 
})


physical_stock_array.push({
  godown_id: 3,
  qty: 15 
})

// insert_material_request_form();

$('#part_no').on('input',function(){
   //check the value not empty
       if($('#part_no').val() !="")
       {
         $('#part_no').autocomplete({
           //get data from databse return as array of object which contain label,value

           source: function(request, response) {
             $.ajax({
               url: "php/mrf_partname_autocomplete.php",
               type: "get", //send it through get method
               data: {
               part_name : $("#part_no").val()


             },
             dataType: "json", 
               success: function (data) {

             console.log(data);
             response($.map(data, function(item) {
               return {

                   label: item.part_name + "-" + item.part_no,
                   value: item.part_name,
                   id: item.part_id,
                   part_name: item.part_name,
                   reorder_qty: item.reorder_qty,
                   min_order_qty : item.min_order_qty
               };
           }));

               }

             });
           },
           minLength: 2,
           cacheLength: 0,
           select: function(event, ui) {

             $(this).data("selected-part_id", ui.item.id);
            $("#minimum_order_qty").val(ui.item.min_order_qty);
            $("#reorder_quantity").val(ui.item.reorder_qty);


           } ,

         }).autocomplete("instance")._renderItem = function(ul, item) {
           return $("<li>")
               .append("<div><strong>" + item.part_name + "</strong> - " + item.value + "</div>")
               .appendTo(ul);
       };
       }

      });

        $('#material_request_form_store').on('submit', function (event) {
        event.preventDefault();
      
        if (!this.checkValidity()) {
          event.stopPropagation();
          $(this).addClass('was-validated');
          return;
        }
      
        $(this).addClass('was-validated');
        insert_material_request_form();
      
        // // ✅ All database (AJAX) operations go here
        // if (actionType === 'submit') {
        //   // insert via AJAX
        // } else if (actionType === 'update') {
        //   // update via AJAX 
        // }
      });


      $("#add_btn").on("click", function(event) {
        event.preventDefault();
        // TODO: handle click here
        console.log($("#godown_name").val());

        if( $("#godown_name").val() == null || $("#physical_stock_input").val() == "")
        {
          shw_toast("Error", "Please fill all fields", "error");
          return;
        }


        console.log($("#godown_name").data("godown_id"));
       

        $("#physical_stock_table_body").append("<tr data-godown_name='"+ $('#godown_name option:selected').data("godown_id")+"'><td>"+$("#godown_name").val()+"</td><td>"+$("#physical_stock_input").val()+"</td><td><button type='button' class='btn btn-danger btn-sm remove-btn'>Remove</button></td></tr>");

        $("#godown_name").val("");
        $("#physical_stock_input").val("");

      });


      $("#physical_stock_table_body").on("click", "tr td button", function(event) {
        event.preventDefault();
        // your logic here
        var thisrow = $(this).closest("tr");
        
          {
          swal({
            title: "Are you sure - Delete? ",
            text: "You will not be recover this  again!",
            icon: "warning",
            buttons: [
              'No, cancel it!',
              'Yes, I am sure!'
            ],
            dangerMode: true,
          }).then(function(isConfirm) {
            if (isConfirm) {
              swal({
                title: 'Applied!',
                text: 'successfully Deleted!',
                icon: 'success'
              }).then(function() {
        
                thisrow.remove();
                shw_toast("Success", "Row removed successfully", "success");
        
        
              });
            } else {
              swal("Cancelled", "This is safe :)", "error");
            }
          })
          }
      });


      

});









function insert_material_request_form()
{
    var physical_stock_array = [];

    $("#physical_stock_table_body tr").each(function() {
        var godown_id = $(this).data("godown_name");
        var physical_stock = $(this).find("td").eq(1).text();

        physical_stock_array.push({
          godown_id: godown_id,
          qty: physical_stock
        });

        console.log(physical_stock_array);
    });

    
    
    
    var bom_production = 0;
if($("#bom_production_yes").prop("checked"))
{
    bom_production = 1;
}
   $.ajax({
     url: "php/insert_material_request_form.php",
     type: "get", //send it through get method
     data: {
     emp_id :  current_user_id,
part_id :  $("#part_no").data("selected-part_id"),
bom_production :  bom_production,
order_type :  $('#order_type').val(),
shortfall_qty :  $('#shortfall_quantity').val(),
stock_for_sufficent_days :  $('#stock_for_sufficient_days').val(),
req_qty :  $('#requirement_quantity').val(),
req_date :  $('#requirement_date').val(),
last_purchase_date :  $('#last_purchase_date').val(),
last_purchase_qty :  $('#last_purchase_qty').val(),
material_receipt_status :  0,
prepared_by: current_user_id,
physical_stock_approved_by :  current_user_id,
physical_stock_array : JSON.stringify(physical_stock_array),

     },
     success: function (response) {
   
   
   if (response.trim() == "ok") {
    
 
   
  }
   console.log(response);
  
   location.reload();
   
       
     },
     error: function (xhr) {
         //Do Something to handle error
     }
   });
   
   
   
      
   }



  function get_internal_godown()
   {
    

   
   $.ajax({
     url: "php/get_all_internal_godown.php",
     type: "get", //send it through get method
     data: {
     
     },
     success: function (response) {
   
        $('#godown_name').empty();
        
   
         $('#godown_name').append("<option selected disabled value=''>Select Godown</option>");

   if (response.trim() != "error") {

    if (response.trim() != "0 result")
    {
   
     var obj = JSON.parse(response);
   var count =0 
   
   
     obj.forEach(function (obj) {
        count = count +1;
$('#godown_name').append("<option data-godown_id='"+obj.internal_godown_id+"'>"+obj.godown_name+"</option>")

     });

    
   }
   else{
   // $("#@id@") .append("<td colspan='0' scope='col'>No Data</td>");
 
   }
  }
   
  
   
   
       
     },
     error: function (xhr) {
         //Do Something to handle error
     }
   });
   
   
   
      
   }
  



   



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
      
    //    get_sales_order()
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