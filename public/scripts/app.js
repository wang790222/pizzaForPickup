
$(document).ready(function() {

  let order = {
    //time_placed: time,
    extra: {
      extra: []
    },
    pizza_order: {
      pizzas: []
    },
    estimated_time: 0,
    cost: 0
  };
  var previousSizeCost = 0;
  var previousSizeTime = 0;
  var previousCrustCost = 0;
  var previousCrustTime = 0;

  var pizza = {
    crust: "",
    size: "",
    toppings: [],
    time: 0,
    cost: 0
  };

  var firstAddPizza = true;

  $("#add_new_pizza").on("click", function() {

    if (firstAddPizza) {
      pizza.time = 0;
      pizza.cost = 0;
      firstAddPizza = false;
      updateTimeMoney();
    }
  });

  $("#checkoutBtn").on('click', function(){

    if (order.extra.extra.length === 0 && order.pizza_order.pizzas.length === 0){
      toastr.warning("please add something to your order");
      return;
    }

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
    console.log(req.body)
    if (req.body.phonenumber === "" || customername === "" || postcode === ""){
      toastr.warning("please enter your user information");
      return;
    }
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/customer",
      data: $("form#customer").serialize(),
      success: function(response) {
        window.location.reload();
      },
      error: function(err) {
        console.log("err:", err);
      }
    }).done(function() {
    });
  });

  // size
  $("#small, #medium, #large").click(function() {
    let cost = parseFloat($(this).data("cost"));
    let time = parseFloat($(this).data("time"));
    let size = $(this).attr("id");

    pizza.cost -= previousSizeCost;
    pizza.time -= previousSizeTime;

    previousSizeCost = cost;
    previousSizeTime = time;

    pizza.cost += cost;
    pizza.time += time;
    pizza.size = size;

    updateTimeMoney();
  });
  // crust
  $("#thin, #regular, #stuffed" ).click(function() {
    let cost = parseFloat($(this).data("cost"));
    let time = parseFloat($(this).data("time"));
    let crust = $(this).attr("id");

    pizza.cost -= previousCrustCost;
    pizza.time -= previousCrustTime;

    previousCrustCost = cost;
    previousCrustTime = time;

    pizza.cost += cost;
    pizza.time += time;
    pizza.crust = crust;

    updateTimeMoney();
  });

  // topping
  $('.form-check-inline input[type="checkbox"]').on('click', function() {
    let cost = parseFloat($(this).data("cost"));
    let topping = $(this).attr("id");
    let wasNoTopping = (pizza.toppings.length) ? false : true;

    if ($(this).is(':checked')) {
      pizza.cost += cost;
      pizza.toppings.push(topping);
    } else {
      pizza.cost -= cost;
      let index = pizza.toppings.indexOf(topping);
      if (index > -1) {
        pizza.toppings.splice(index, 1);
      }
    }

    if (pizza.toppings.length && wasNoTopping) {
      pizza.time += 1;
    }
    if (pizza.toppings.length === 0) {
      pizza.time -= 1;
    }

    updateTimeMoney();
  });

  // extra
  $( "ul.extra > li > span" ).each(function() {
    $(this).on("click", function() {
      let cost = parseFloat($(this).parent("li").data("cost"));
      let time = parseFloat($(this).parent("li").data("time"));
      let extra = $(this).parent("li").attr("id");
      let count = Number($(this).siblings(".count").val());
      let wasNoExtra = (order.extra.extra.length) ? false : true;

      if ($(this).is(".minus")) {
        count--;
        if (count >= 0) {
          order.cost -= cost;
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
        order.extra.extra.push(extra);
      }

      if (order.pizza_order.pizzas.length === 0 && wasNoExtra) {
        order.estimated_time = 1;
      }

      if (order.extra.extra.length === 0){
        order.estimated_time -= 1;
      }

      updateTimeMoney();
      $(this).siblings(".count").val(count);
    });

  });

  $("#add_pizza").on("click", function() {

    if (pizza.crust === "" || pizza.size === ""){
      toastr.warning("please select size and crust");
      return;
    }

    order.cost += pizza.cost;
    order.estimated_time += pizza.time;
    order.pizza_order.pizzas.push(pizza);

    let pizzaIfo = `${pizza.size} / ${pizza.crust} / `;
    let toppingStr = [];
    for (let topping of pizza.toppings) {
      toppingStr.push(topping);
    }
    pizzaIfo += toppingStr.join(" - ");

    let appendStr = `<li class="qty mt-5"> ${pizzaIfo} <span class="minus bg-dark">-</span> </li>`;

    resetOptions();
    updateTimeMoney();

    $("#pizza_info").append(function() {
      return $(appendStr).click(deletePizzaHandler);
    });
  });

  function deletePizzaHandler() {

    let costDeduct = order.pizza_order.pizzas[($(this).index())].cost;
    let timeDeduct = order.pizza_order.pizzas[($(this).index())].time;

    order.cost -= costDeduct;
    order.estimated_time -= timeDeduct;

    updateTimeMoney();
    resetOptions();

    order.pizza_order.pizzas.splice($(this).index(), 1);
    $(this).remove();
  }

  function resetOptions() {

    previousSizeCost = 0;
    previousSizeTime = 0;
    previousCrustCost = 0;
    previousCrustTime = 0;

    pizza = {
      crust: "",
      size: "",
      toppings: [],
      time: 0,
      cost: 0
    };

    $(".nav-item > a").each(function(index) {
      $(this).removeClass("active show");
    });

    $('.form-check-inline input[type="checkbox"]').each(function() {
      $(this).prop('checked', false);
    });
  }

  function updateTimeMoney() {

  $("#est").remove();
  $("#total_amount").remove();
    let estAndMoneyStr = `<p id="est">Estimated time: ${order.estimated_time + pizza.time} mins</p>
                          <p id="total_amount">Total: ${order.cost + pizza.cost} $</p>`;
    $("#time_money").append(estAndMoneyStr);
  }

});
