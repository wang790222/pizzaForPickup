
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

//restaurant page 

$(".confirmCookMinutes").on('click', function (e){
    // when button confirm button is clicked post the time 
    function addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
    };
    console.log("Got confirm the order time")
    e.preventDefault();
    let estimateTime = $(this).siblings('#cookminutes').val();
    console.log("Estimate Time", e, estimateTime, $(this).siblings())
    ///let nowTime = new Date();
    let estTimePickup = addMinutes((new Date()), estimateTime)
    console.log("timepickup", estTimePickup)

    $.ajax({
      type: "POST",
      url: "/restaurant/confirm_time",
      dataType: "json",
      data: {
        time_confirmed: confirmedTime
      },
      //moment(Date.now()).add(cookminutes, 'm').toDate(),
      success: function(response) {
        console.log(response);
        // update pizza order table to include cust_id
        // send form data to db, customer table
        //change view to second panel (order in progress)
      },
      error: function(err) {
        console.log("err:", err);
      }
    });
  })

  $("#pickedupchecked").on('click', function (e){


    console.log("Got the pick up confirm")
    //console.log(req.body.time_pickup);

    e.preventDefault();

    // Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
    // Date.time = function() { return new Date().toUnixTime(); }
    let currenttime = Date.now()

    $.ajax({
      type: "POST",
      url: "/restaurant/pickup_time",
      dataType: "json",
      data: {
        time_pickup: currenttime
      },
      success: function(response) {
        // update pizza order table to include cust_id
        // send form data to db, customer table
        //change view to second panel (order in progress)
      },
      error: function(err) {
        console.log("err:", err);
      }
    });
  })

  $("#confirm").on('click', function (e){
    // take info from localStorage
    // take info from forms
    // combine info in object
    // pass to database
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/customer",
      dataType: "json",
      data: $("form#customer").serialize(),
      success: function(response) {
        // update pizza order table to include cust_id
        // send form data to db, customer table
        //change view to second panel (order in progress)
      },
      error: function(err) {
        console.log("err:", err);
      }
    });
  })

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
  var cost = $(this).data( "cost" );
  console.log(cost);
  var time = $(this).data( "time");
  var size = $(this).data( 'size');
  order.cost += parseInt(cost);
  pizzaCost += parseInt(cost);
  order.estimated_time += parseInt(time);
  order.pizza_order['size'] = $(this).attr("id");
  console.log(order)
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
  console.log(order)
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

    $("#sugarcravinsoda > .plus.bg-dark").click(function () {
      $('#sugarcravinsoda > .count').val(parseInt($('.count').val()) + 1 );
      order.extra.extra.push('sugarcravinsoda')
      order.cost += parseFloat($('#sugarcravinsoda').data('cost'))
     });

    $("#sugarcravinsoda > .minus.bg-dark").click(function () {
      $('#sugarcravinsoda > .count').val(parseInt($('.count').val()) - 1 );
      if ($('.count').val() <= 0) {
        $('.count').val(0);
      }
      var index = order.extra.extra.indexOf('sugarcravinsoda');
      if (index > -1) {
        order.extra.extra.splice(index, 1);
        order.cost -= parseFloat($('#sugarcravinsoda').data('cost'))
      }
    })



});
