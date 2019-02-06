
$(document).ready(function() {

  let order = {
    //time_placed: time,
    extra: {
      extra: []
    },
    pizza_order: {
      pizzas: []
    },
    time_placed: "",
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

    let d = new Date();
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() }`;
    let time = `${d.getHours()}:${(d.getMinutes())}:${d.getSeconds()}`;

    order.time_placed = `${date} ${time}`;

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
  $( "div.extra > div > span" ).each(function() {
    $(this).on("click", function() {
      console.log(Number($(this).siblings('.count').val()))
      let cost = parseFloat($(this).parent("div").data("cost"));
      let time = parseFloat($(this).parent("div").data("time"));
      let extra = $(this).parent("div").attr("id");
      let count = Number($(this).siblings('.count').val());
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

    $("#extracheeseimg").hide();
    $("#onionsimg").hide();
    $("#pepperoniimg").hide();
    $("#mushroomsimg").hide();
    $("#baconimg").hide();
    $("#greenpeppersimg").hide();
    $("#goatcheeseimg").hide();
    $("#spinachimg").hide();
    $("#olivesimg").hide();
    $("#truffleimg").hide();
    $("#largeimg").hide();
    $("#mediumimg").hide();
    $("#smallimg").hide();
    $("#crustthinimg").hide();
    $("#crustregularimg").hide();
    $("#cruststuffedimg").hide();
    $("#placeholderimg").show();

    order.cost += pizza.cost;
    order.estimated_time += pizza.time;
    order.pizza_order.pizzas.push(pizza);

    let pizzaInfo = `${pizza.size} / ${pizza.crust} crust `;

    if (pizza.toppings.length > 0) {

      pizzaInfo += `/ `;

      let toppingStr = [];
      for (let topping of pizza.toppings) {
        toppingStr.push(topping);
      }
      pizzaInfo += toppingStr.join(" - ");
    }

    let appendStr = `<li class="qty mt-5 added_pizza" style="text-align: left;"> ${pizzaInfo} <span class="minus bg-dark">-</span> </li>`;

    resetOptions();
    updateTimeMoney();
    $('#add_new_pizza').click();

    $("#pizza_info").append(appendStr);
  });

  $("#pizza_info").delegate("li > span", "click", function() {

    let costDeduct = order.pizza_order.pizzas[($(this).parent().index())].cost;
    let timeDeduct = order.pizza_order.pizzas[($(this).parent().index())].time;

    order.cost -= costDeduct;
    order.estimated_time -= timeDeduct;

    updateTimeMoney();
    resetOptions();

    order.pizza_order.pizzas.splice($(this).parent().index(), 1);
    $(this).parent().remove();
  });

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
    let estAndMoneyStr = `<p id="est">Preparation time: ${order.estimated_time + pizza.time} mins</p>
                          <p id="total_amount"><b>Total: $${order.cost + pizza.cost}<b\></p>`;
    $("#time_money").append(estAndMoneyStr);
  }

});
