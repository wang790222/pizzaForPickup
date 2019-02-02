
$(document).ready(function() {

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
  var previousSizeCost = 5;
  var previousSizeTime = 5;
  var previousCrustCost = 5;
  var previousCrustTime = 5;

  var pizza = {
    crust: "thin",
    size: "small",
    toppings: []
  };

  var firstAddPizza = true;

  $("#add_new_pizza").on("click", function() {
    if (firstAddPizza) {
      order.estimated_time = 5;
      order.cost = 5;
      firstAddPizza = false;
      updateTimeMoney();
    }
  });

  $("#checkoutBtn").on('click', function(){
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

    order.cost -= previousSizeCost;
    order.estimated_time -= previousSizeTime;

    previousSizeCost = cost;
    previousSizeTime = time;

    order.cost += cost;
    order.estimated_time += time;

    pizza.size = size;
    updateTimeMoney();
  });

  // crust
  $("#thin, #regular, #stuffed" ).click(function() {
    let cost = parseInt($(this).data("cost"));
    let time = parseInt($(this).data("time"));
    let crust = $(this).attr("id");

    order.cost -= previousCrustCost;
    order.estimated_time -= previousCrustTime;

    previousCrustCost = cost;
    previousCrustTime = time;

    order.cost += cost;
    order.estimated_time += time;

    pizza.crust = crust;
    updateTimeMoney();
  });

  // topping
  $('.form-check-inline input[type="checkbox"]').on('click', function() {
    let cost = parseInt($(this).data("cost"));
    let topping = $(this).attr("id");
    let wasNoTopping = (pizza.toppings.length) ? false : true;

    if ($(this).is(':checked')) {
      order.cost += cost;
      pizza.toppings.push(topping);
    } else {
      order.cost -= cost;
      let index = pizza.toppings.indexOf(topping);
      if (index > -1) {
        pizza.toppings.splice(index, 1);
      }
    }

    if (pizza.toppings.length && wasNoTopping) {
      order.estimated_time += 1;
    }
    if (pizza.toppings.length === 0) {
      order.estimated_time -= 1;
    }
    updateTimeMoney();
  });

  // extra
  $( "ul.extra > li > span" ).each(function() {
    $(this).on("click", function() {
      let cost = parseInt($(this).parent("li").data("cost"));
      let time = parseInt($(this).parent("li").data("time"));
      let extra = $(this).parent("li").attr("id");
      let count = Number($(this).siblings(".count").val());

      if ($(this).is(".minus")) {
        count--;
        if (count >= 0) {
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
        order.cost += cost;
        order.estimated_time += time;
        order.extra.extra.push(extra);
      }
      updateTimeMoney();
      $(this).siblings(".count").val(count);
    });

  });

  $("#add_pizza").on("click", function() {
    order.pizza_order.pizza_order.push(pizza);

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

    updateTimeMoney();

    $("#pizza_info").append(function() {
      return $(appendStr).click(deletePizzaHandler);
    });
  });

  function deletePizzaHandler() {
    order.pizza_order.pizza_order.splice($(this).index());
    $(this).remove();
  }

  function resetOptions() {

    previousSizeCost = 5;
    previousSizeTime = 5;
    previousCrustCost = 5;
    previousCrustTime = 5;

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

  function updateTimeMoney() {

  $("#est").remove();
  $("#total_amount").remove();
    let estAndMoneyStr = `<p id="est">Estimated time: ${order.estimated_time} mins</p>
                          <p id="total_amount">Total: ${order.cost} $</p>`;
    $("#time_money").append(estAndMoneyStr);
  }

});
