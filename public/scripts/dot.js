
$(document).ready(function() {





}
    $('#in_progress').append(`<p id="demo"></p>
        <script>
            function startTimer(duration, display) {
                var timer = duration, minutes, seconds;
                setInterval(function () {
                    minutes = parseInt(timer / 60, 10)
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    display.textContent = minutes + ":" + seconds;

                    if (--timer < 0) {
                        timer = duration;
                    }
                }, 1000);
            }
                var fiveMinutes = 60 * $('#in_progress').val(),
                display = document.querySelector('#demo');
                startTimer(fiveMinutes, display)
        </script>`)


    $( "#recieved" ).append(`

        <p class="ring-container">
          <style scoped>
          .ring-container {
            position: relative;
        }

        .circle {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            top: 23px;
            left: 23px;
            filter: drop-shadow(0 0 30px #333);
        }

        .ringring {
            border: 3px solid red;
            -webkit-border-radius: 30px;
            height: 25px;
            width: 25px;
            position: absolute;
            left: 15px;
            top: 15px;
            -webkit-animation: pulsate 1s ease-out;
            -webkit-animation-iteration-count: infinite;
            opacity: 0.0
        }
        @-webkit-keyframes pulsate {
            0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
            50% {opacity: 1.0;}
            100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
        }
          </style>
            <div class="ringring"></div>
            <div class="circle"></div>
        </p>`)

        $( "#in_progress" ).append(`

        <p class="ring-container">
          <style scoped>
          .ring-container {
            position: relative;
        }

        .circle {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            top: 23px;
            left: 23px;
            filter: drop-shadow(0 0 30px #333);
        }

        .ringring {
            border: 3px solid red;
            -webkit-border-radius: 30px;
            height: 25px;
            width: 25px;
            position: absolute;
            left: 15px;
            top: 15px;
            -webkit-animation: pulsate 1s ease-out;
            -webkit-animation-iteration-count: infinite;
            opacity: 0.0
        }
        @-webkit-keyframes pulsate {
            0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
            50% {opacity: 1.0;}
            100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
        }
          </style>
            <div class="ringring"></div>
            <div class="circle"></div>
        </p>`)
            $( "#ready" ).append(`

        <p class="ring-container">
          <style scoped>
          .ring-container {
            position: relative;
        }

        .circle {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            top: 23px;
            left: 23px;
            filter: drop-shadow(0 0 30px #333);
        }

        .ringring {
            border: 3px solid red;
            -webkit-border-radius: 30px;
            height: 25px;
            width: 25px;
            position: absolute;
            left: 15px;
            top: 15px;
            -webkit-animation: pulsate 1s ease-out;
            -webkit-animation-iteration-count: infinite;
            opacity: 0.0
        }
        @-webkit-keyframes pulsate {
            0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
            50% {opacity: 1.0;}
            100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
        }
          </style>
            <div class="ringring"></div>
            <div class="circle"></div>
        </p>`)

});