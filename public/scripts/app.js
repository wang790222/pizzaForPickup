
$( document ).ready(function() {

  $(".btn-primary").on('click', function(){
    localStorage.setItem("crust", "thin");
    //console.log(localStorage);

    $.ajax({
     method: "GET",
     url: "/api/crust"
    }).done((crust) => {

    });
  });
});
