(function start() {

var body = document.querySelector("body");
var startButton = document.querySelector(".start-button");
var gameCanvas = document.querySelector("#game");
var gameRules = document.querySelector(".rules-container");
var playerSpeach = document.querySelector(".player-speach")
var rulesSection = document.querySelector(".container");
var rule01 = document.querySelector(".player-speach-01");
var rule02 = document.querySelectorAll(".player-speach-02");
var rule03 = document.querySelector(".player-speach-03");
var rule03a = document.querySelector(".text-arrow-key");
var next = document.querySelector(".next.next1");
var bugs = document.querySelector(".bugs");
var playerImage = document.querySelector(".player-image");

// Screen 02 with Bugs animation

function readGameRules01() {

    // Removing the Rule 01
    playerImage.classList.remove("player-start");
    playerSpeach.classList.remove("showUp");
    playerSpeach.classList.add("showDown");
    playerImage.classList.add("showDown");

    setTimeout(function(){

        playerSpeach.classList.add("hide");
        playerSpeach.classList.remove("showDown");

        // Adding animation with bugs

        playerImage.classList.remove("showDown");
        playerImage.classList.add("showUp");
        bugs.classList.remove("hide");
        bugs.classList.add("showUp");
        bugs.classList.add("show");
        playerImage.classList.add("player-run");

        setTimeout(function(){

            playerImage.classList.remove("showUp");

            setTimeout(function(){

                // Removing animation with bugs

                bugs.classList.add("hide");
                bugs.classList.remove("show");
                playerImage.classList.remove("player-run");

                // Updating to Rule 02

                next.removeEventListener("click", readGameRules01);
                next.classList.remove("next1");
                next.classList.add("next2");
        
                rule01.classList.add("hide");
                rule02.forEach(function(rule){
                    rule.classList.remove("hide");
                })

                // Screen 03 - Showing Rule 02

                playerImage.classList.add("showUp");
                playerSpeach.classList.remove("hide");
                playerSpeach.classList.add("showUp");

            }, 1000)

        }, 950);

    },950) // waiting till the animation finishes


   function readGameRules02() {

        // Removing Screen 03 - Rule 02

        playerSpeach.classList.remove("showUp");
        playerSpeach.classList.add("showDown");

        setTimeout(function(){

            // Updating to Rule 03

            next.removeEventListener("click", readGameRules02);
            next.classList.remove("next2");
            next.classList.add("next3");

            rule02.forEach(function(rule){
                rule.classList.add("hide");
            })
            rule03.classList.remove("hide");
            rule03a.classList.remove("hide");

            // Screen 04 - showing Rule 03

            playerSpeach.classList.remove("showDown");
            playerSpeach.classList.add("showUp");
    
        },950)


        function readGameRules03() { 

            // Removing Screen 04 - Rule 03

            playerSpeach.classList.remove("showUp");
            playerSpeach.classList.add("showDown");
    
            setTimeout(function(){

                next.removeEventListener("click", readGameRules03);
                next.classList.add("hide");

                rule03.classList.add("hide");
                rule03a.classList.add("hide");

                // Screen 05 - Showing Start Button

                startButton.classList.remove("hide");
                playerSpeach.classList.remove("showDown");
                playerSpeach.classList.add("showUp");

            },950)


            function renderAll() {

                // Removing Screen 05 - Start Button

                playerSpeach.classList.remove("showUp");
                rulesSection.classList.add("showDown");
                body.classList.add("showDown");

                setTimeout(function(){

                    rulesSection.classList.add("hide"); 

                    // Screen 06 - Showing the Game
                    body.classList.add("showUp");
                    gameCanvas.classList.remove("hide");
                    gameCanvas.classList.add("showUp");
                    body.classList.remove("sky");   

                },950)
            }
            
            startButton.addEventListener("click", renderAll)
        }

        next.addEventListener("click", readGameRules03);
   }

   next.addEventListener("click", readGameRules02);
}

next.addEventListener("click", readGameRules01);
})();

