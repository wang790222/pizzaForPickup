
$(document).ready(function() {

  var time = Date.now();
  let order = {
    //time_placed: time,
    extra: {
      extra: []
    },
    pizza_order: {
      pizza_order: []
    },
    estimated_time: 0,
    cost: 0
  };
  var toppingTime = 0;
  var toppingCost = 0;
  var pizzaTime = 0;
  var pizzaCost = 0;
  var pizza = {
    crust: "thin",
    size: "small",
    toppings: []
  };


  $("#checkoutBtn").on('click', function(){

    /***  Fake Data ***//*
    let localStorage = {
      //customer_id: 0,
      time_placed: "2019-01-31 17:01:23+00",
      //time_confirmed: null,
      extra: ["extra1", "extra2"],
      pizza_order: [
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
      ],
      estimated_time: 30,
      cost: 25.00,
      //time_pickup: null
    };*/

    $.ajax({
      type: "POST",
      url: "/",
      dataType: "json",
      data: {
        data: order
      },
      success: function(response) {
        window.location.href = `/${response}`;
      },
      error: function(err) {
        console.log("err:", err);
      }
    });
  });


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
  });

  // size
  $("#small, #medium, #large").click(function() {
    let cost = parseInt($(this).data("cost"));
    let time = parseInt($(this).data("time"));
    let size = $(this).attr("id");
    order.cost += cost;
    order.estimated_time += time;

    pizza.size = size;
  });

  // crust
  $("#thin, #regular, #stuffed" ).click(function() {
    let cost = parseInt($(this).data("cost"));
    let time = parseInt($(this).data("time"));
    let crust = $(this).attr("id");
    order.cost += cost;
    order.estimated_time += time;

    pizza.crust = crust;
  });

  // topping
  $('.form-check-inline input[type="checkbox"]').on('click', function() {
    let cost = parseInt($(this).data("cost"));
    let time = parseInt($(this).data("time"));
    let topping = $(this).attr("id");
    if ($(this).is(':checked')) {
      if (time > toppingTime) {
        order.estimated_time += (time - toppingTime);
        toppingTime = time;
      }
      order.cost += cost;
      pizzaCost += time;

      pizza.toppings.push(topping);
    } else {
      pizzaCost -= cost;
      if (time === toppingTime) {
        order.estimated_time -= (time - toppingTime);
        toppingTime = 1;
      }
      order.cost -= cost;
      let index = pizza.toppings.indexOf(topping);
      if (index > -1) {
        pizza.toppings.splice(index, 1);
      }
    }
  });

  $( "ul.extra > li > span" ).each(function() {
    $(this).on("click", function() {
      let cost = parseInt($(this).parent("li").data("cost"));
      let time = parseInt($(this).parent("li").data("time"));
      let extra = $(this).parent("li").attr("id");
      let count = Number($(this).siblings(".count").val());

      if ($(this).is(".minus")) {
        count--;
        if (count > 0) {
          order.cost -= cost;
          order.estimated_time -= time;
          let index = order.extra.extra.indexOf(extra);
          if (index > -1) {
            order.extra.extra.splice(index, 1);
          }
        } else {
          count = 0;
        }
      } else {
        count++;
        order.extra.extra.push(extra);
      }
      $(this).siblings(".count").val(count);
    });
  });

  $("#add_pizza").on("click", function() {
    order.pizza_order.pizza_order.push(pizza);

    console.log(order);
    let pizzaIfo = `${pizza.size} / ${pizza.crust} / `;
    let toppingStr = [];
    for (let topping of pizza.toppings) {
      toppingStr.push(topping);
    }
    pizzaIfo += toppingStr.join(" - ");

    let appendStr = `<li class="qty mt-5"> ${pizzaIfo} <span class="minus bg-dark">-</span> </li>`;

    resetOptions();

    pizza = {
      size: "small",
      crust: "thin",
      toppings: []
    };

    $("#pizza_info").append(function() {
      return $(appendStr).click(deletePizzaHandler);
    });
  });

  function deletePizzaHandler() {
    order.pizza_order.pizza_order.splice($(this).index());
    $(this).remove();
  }
});

function resetOptions() {

  $(".nav-item > a").each(function(index) {
    $(this).removeClass("active show");
    if (index === 0) {
      $(this).addClass("active show"); //Small Btn
    }

    if (index === 3) {
      $(this).addClass("active show"); //Thin Btn
    }
  });

  $('.form-check-inline input[type="checkbox"]').each(function() {
    $(this).prop('checked', false);
  });
}
