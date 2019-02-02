
$( document ).ready(function() {

  $("#checkoutBtn").on('click', function(){

    /***  Fake Data ***/
    let localStorage = {
      //customer_id: 0,
      time_placed: "2019-01-31 17:01:23+00",
      //time_confirmed: null,
      extra: {
        extra: ["extra1", "extra2"]
      },
      pizza_order: {
        pizza_order:
        [
          {
            size: "Small",
            crust: "Thin",
            Topping: ["ToppingA", "ToppingB"]
          },
          {
            size: "Reg",
            crust: "Thin",
            Topping: ["ToppingC", "ToppingD"]
          }
        ]
      },
      estimated_time: 30,
      cost: 25.00,
      //time_pickup: null
    };

    $.ajax({
      type: "POST",
      url: "/",
      dataType: "json",
      data: {
        data: localStorage
      },
      success: function(response) {
        window.location.href = `/${response}`;
      },
      error: function(err) {
        console.log("err:", err);
      }
    });
  });






// ------------------------------ Alter local storage -------------------
var time = Date.now();
let order = {
  //customer_id: 0,
      time_placed: time,
      extra: {
            extra: [],
            },
      pizza_order: {
            crust: "",
            size: "",
            toppings: [],
            },
      estimated_time: 0,
      cost: 0
    };
var toppingTime = 0
var toppingCost = 0
var pizzaTime = 0
var pizzaCost = 0



// size
$( "#small" ).click(function() {
  console.log('hello')
  var cost = $(this).data( "cost" );
  console.log(cost);
  var time = $(this).data( "time");
  var size = $(this).data( 'size');
  order.cost += parseInt(cost);
  pizzaCost += parseInt(cost);
  order.estimated_time += parseInt(time);
  order.pizza_order['size'] = $(this).attr("id");
})


// crust
$( "#thin" ).click(function() {
  var cost = $(this).data( "cost" );
  var time = $(this).data( "time");
  var crust = $(this).data( 'crust');
  order.cost += parseInt(cost);
  pizzaCost += parseInt(cost);
  order.estimated_time += parseInt(time);
  order.pizza_order['crust'] = $(this).attr("id");
})
// toppings


$('#extracheese').click(function() {
   if ($(this).is(':checked')) {
    var cost = $(this).data( "cost" );
    var time = $(this).data( "time");
    if (time > toppingTime) {
      order.estimated_time += (time - toppingTime);
      toppingTime = time
    }
    order.cost += parseInt(cost);
    pizzaCost += parseInt(cost);
    order.pizza_order.toppings.push($(this).attr("id"));
   } else {
      var cost = $(this).data( "cost" );
      var time = $(this).data( "time");
      if (time = toppingTime) {
        order.estimated_time -= (time - toppingTime);
        toppingTime = 1
      }
      order.cost -= parseInt(cost);
      var index = order.pizza_order.toppings.indexOf($(this).attr("id"));
      if (index > -1) {
        order.pizza_order.toppings.splice(index, 1);
      }
    }
 });

 $('#onions').click(function() {

   if ($(this).is(':checked')) {
    var cost = $(this).data( "cost" );
    var time = $(this).data( "time");
    if (time > toppingTime) {
      order.estimated_time += (time - toppingTime);
      toppingTime = time
    }
    order.cost += parseInt(cost);
    pizzaCost += parseInt(cost);
    order.pizza_order.toppings.push($(this).attr("id"));
   } else {
      var cost = $(this).data( "cost" );
      pizzaCost -= $(this).data( "cost" );
      var time = $(this).data( "time");
      if (time = toppingTime) {
        order.estimated_time -= (time - toppingTime);
        toppingTime = 1
      }
      order.cost -= parseInt(cost);
      var index = order.pizza_order.toppings.indexOf($(this).attr("id"));
      if (index > -1) {
        order.pizza_order.toppings.splice(index, 1);
      }
   }
 });

// ---------------------extras-------------------------------------


    $('.qty.mt-5').find('.plus').click(function () {
      console.log($(this).parents('li').attr('id'))
      $(this).siblings('.count').val(parseInt($(this).siblings('.count').val()) + 1 )
      // order.extra.extra.push('sugarcravinsoda')
      // order.cost += parseFloat($(this).data('cost'))
     });

    $('.qty.mt-5').find('.minus').click(function (){
      $(this).siblings('.count').val(parseInt($(this).siblings('.count').val()) - 1 );
      if ($(this).siblings('.count').val() <= 0) {
        $(this).siblings('.count').val(0);
      }
      var index = order.extra.extra.indexOf('sugarcravinsoda');
      if (index > -1) {
        order.extra.extra.splice(index, 1);
        order.cost -= parseFloat($(this).data('cost'))
      }
    })


    // $("#sugarcravinsoda > .plus.bg-dark").click(function () {
    //   $('#sugarcravinsoda > .count').val(parseInt($('.count').val()) + 1 );
    //   order.extra.extra.push('sugarcravinsoda')
    //   order.cost += parseFloat($('#sugarcravinsoda').data('cost'))
    //  });

    // $("#sugarcravinsoda > .minus.bg-dark").click(function () {
    //   $('#sugarcravinsoda > .count').val(parseInt($('.count').val()) - 1 );
    //   if ($('.count').val() <= 0) {
    //     $('.count').val(0);
    //   }
    //   var index = order.extra.extra.indexOf('sugarcravinsoda');
    //   if (index > -1) {
    //     order.extra.extra.splice(index, 1);
    //     order.cost -= parseFloat($('#sugarcravinsoda').data('cost'))
    //   }
    // })

// -----vampirefreegarlicbread
    // $("#vampirefreegarlicbread > .plus.bg-dark").click(function () {
    //   $('#vampirefreegarlicbread > .count').val(parseInt($('#vampirefreegarlicbread > .count').val()) + 1 );
    //   order.extra.extra.push('vampirefreegarlicbread')
    //   order.cost += parseFloat($('#vampirefreegarlicbread').data('cost'))
    //  });

    // $("#vampirefreegarlicbread > .minus.bg-dark").click(function () {
    //   $('#vampirefreegarlicbread > .count').val(parseInt($('.count').val()) - 1 );
    //   if ($('.count').val() <= 0) {
    //     $('.count').val(0);
    //   }
    //   var index = order.extra.extra.indexOf('vampirefreegarlicbread');
    //   if (index > -1) {
    //     order.extra.extra.splice(index, 1);
    //     order.cost -= parseFloat($('#vampirefreegarlicbread').data('cost'))
    //   }
    // })







});
