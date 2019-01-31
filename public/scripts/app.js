
$( document ).ready(function() {

  $(".btn-primary").on('click', function(){
    localStorage.setItem("crust", "thin");
    console.log(localStorage);
  });



    $.ajax({
      method: "GET",
      url: "/api"
    }).done((items) => {
      for(item of items) {
        console.log(item);
      }
    });;



})