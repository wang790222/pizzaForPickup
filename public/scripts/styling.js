//plus mininus action

// $(document).ready(function(){
//         $('.count').prop('disabled', true);
//         $(document).on('click','.plus',function(){
//         $('.count').val(parseInt($('.count').val()) + 1 );
//         });
//           $(document).on('click','.minus',function(){
//           $('.count').val(parseInt($('.count').val()) - 1 );
//             if ($('.count').val() <= 0) {
//             $('.count').val(0);
//           }
//             });
//     });

//star action

  jQuery(document).ready(function($){

  $(".btnrating").on('click',(function(e) {

  var previous_value = $("#selected_rating").val();

  var selected_value = $(this).attr("data-attr");
  $("#selected_rating").val(selected_value);

  $(".selected-rating").empty();
  $(".selected-rating").html(selected_value);

  for (i = 1; i <= selected_value; ++i) {
  $("#rating-star-"+i).toggleClass('btn-warning');
  $("#rating-star-"+i).toggleClass('btn-default');
  }

  for (ix = 1; ix <= previous_value; ++ix) {
  $("#rating-star-"+ix).toggleClass('btn-warning');
  $("#rating-star-"+ix).toggleClass('btn-default');
  }

  }));
});


//   jQuery(document).ready(function($){





// });

// $(document).ready(function() {
//   $("#mushrooms").click(function(event) {
//     if ($(this).is("#mushroom"))
//       $("#mushroomsimg").show();
//     else
//       $("mushroomsimg").hide();
//   });
// });

$(document).ready(function(){

  $("#extracheeseimg").hide();
  
    $("#extracheese").click(function(){
  
      $("#extracheeseimg").toggle();
  
    });
  
  });

  $(document).ready(function(){

    $("#onionsimg").hide();
    
      $("#onions").click(function(){
    
        $("#onionsimg").toggle();
    
      });
    
    });


  $(document).ready(function(){

    $("#pepperoniimg").hide();
    
      $("#pepperoni").click(function(){
    
        $("#pepperoniimg").toggle();
    
      });
    
    });

    $(document).ready(function(){

      $("#greenpeppersimg").hide();
      
        $("#greenpeppers").click(function(){
      
          $("#greenpeppersimg").toggle();
      
        });
      });

  $(document).ready(function(){

    $("#mushroomsimg").hide();
    
      $("#mushrooms").click(function(){
    
        $("#mushroomsimg").toggle();
    
      });
    
    });

    $(document).ready(function(){

      $("#baconimg").hide();
      
        $("#bacon").click(function(){
      
          $("#baconimg").toggle();
      
        });
      });

  $(document).ready(function(){

    $("#goatcheeseimg").hide();
    
      $("#goatcheese").click(function(){
    
        $("#goatcheeseimg").toggle();
    
      });
    
    });

    $(document).ready(function(){

      $("#spinachimg").hide();
      
        $("#spinach").click(function(){
      
          $("#spinachimg").toggle();
      
        });
      });

  $(document).ready(function(){

    $("#truffleimg").hide();
    
      $("#truffle").click(function(){
    
        $("#truffleimg").toggle();
    
      });
    
    });

    $(document).ready(function(){

      $("#olivesimg").hide();
      
        $("#olives").click(function(){
      
          $("#olivesimg").toggle();
      
        });
      
      });

      $(document).ready(function(){

        $("#crustthinimg").hide();
        
          $("#thin").click(function(){
        
            $("#crustthinimg").toggle();
        
          });
        
        });

        $(document).ready(function(){

          $("#crustregularimg").hide();
          
            $("#regular").click(function(){
          
              $("#crustregularimg").toggle();
          
            });
          
          });

          $(document).ready(function(){

            $("#cruststuffedimg").hide();
            
              $("#stuffed").click(function(){
            
                $("#cruststuffedimg").toggle();
            
              });
            
            });