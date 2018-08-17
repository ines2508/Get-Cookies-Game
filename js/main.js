(function start() {

var body = document.querySelector("body");
var startButton = document.querySelector(".start-button");
var gameCanvas = document.querySelector("#game");
var gameRules = document.querySelector(".rules-container");
var playerSpeach = document.querySelector(".player-speach")
var rulesSection = document.querySelector(".container");
var rule01 = document.querySelector(".player-speach-01");
var rule02 = document.querySelector(".player-speach-02");
var rule03 = document.querySelector(".player-speach-03");
var rule03a = document.querySelector(".text-arrow-key");
var next = document.querySelector(".next.next01");
var bugs = document.querySelector(".bugs");
var playerImage = document.querySelector(".player-image");


function readGameRules01() {
    playerSpeach.classList.add("hide");
    bugs.classList.remove("hide");
    bugs.classList.add("show");
    playerImage.classList.add("player-run");


    // wait till the animation ends
    setTimeout(function(){
        bugs.classList.add("hide");
        bugs.classList.remove("show");
        playerImage.classList.remove("player-run");
        playerSpeach.classList.remove("hide");

        next.removeEventListener("click", readGameRules01);

        rule01.classList.add("hide");
        next.classList.remove("next01");
     
        rule02.classList.remove("hide");
        next.classList.add("next2");

    }, 2000)


   function readGameRules02() {

        next.removeEventListener("click", readGameRules02);
        rule02.classList.add("hide");
        next.classList.remove("next2");
        next.classList.add("next3");

        rule03.classList.remove("hide");
        rule03a.classList.remove("hide");

        function readGameRules03() { 

            next.removeEventListener("click", readGameRules03);
            rule03.classList.add("hide");
            rule03a.classList.add("hide");
            next.classList.add("hide");
            startButton.classList.remove("hide");

            function renderAll() {

                gameCanvas.classList.remove("hide");
                gameRules.classList.add("hide");
                rulesSection.classList.add("hide");
                body.classList.add("b-background");
                body.classList.add("center");
            }
            
            startButton.addEventListener("click", renderAll)
        }

        next.addEventListener("click", readGameRules03);
   }

   next.addEventListener("click", readGameRules02);
}

next.addEventListener("click", readGameRules01);
})();

