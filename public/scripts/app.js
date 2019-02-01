
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
});
