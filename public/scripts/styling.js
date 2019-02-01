//plus mininus action

$(document).ready(function(){
        $('.count').prop('disabled', true);
        $(document).on('click','.plus',function(){
        $('.count').val(parseInt($('.count').val()) + 1 );
        });
          $(document).on('click','.minus',function(){
          $('.count').val(parseInt($('.count').val()) - 1 );
            if ($('.count').val() == 0) {
            $('.count').val(1);
          }
            });
    });

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