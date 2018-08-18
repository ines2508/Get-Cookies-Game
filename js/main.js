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


function readGameRules01() {

    playerSpeach.classList.remove("speaking");
    playerSpeach.classList.add("stop-talking");
    playerImage.classList.add("stop-talking");


    setTimeout(function(){
        playerSpeach.classList.add("hide");
        playerSpeach.classList.remove("stop-talking");

        playerImage.classList.remove("stop-talking");
        playerImage.classList.add("speaking");
        bugs.classList.remove("hide");

        bugs.classList.add("speaking");
        bugs.classList.add("show");
        playerImage.classList.add("player-run");


        setTimeout(function(){
            playerImage.classList.remove("speaking");

              // wait till the animation ends
        setTimeout(function(){
            bugs.classList.add("hide");
            bugs.classList.remove("show");
            playerImage.classList.remove("player-run");
            playerImage.classList.add("speaking");
    
            next.removeEventListener("click", readGameRules01);
    
            rule01.classList.add("hide");
            next.classList.remove("next1");
         
            rule02.forEach(function(rule){
                rule.classList.remove("hide");
            })

            next.classList.add("next2");

            playerSpeach.classList.remove("hide");
            playerSpeach.classList.add("speaking");


        }, 950)
    

        }, 950);
    
    
      
    

    },950)


   function readGameRules02() {

        playerSpeach.classList.remove("speaking");
        playerSpeach.classList.add("stop-talking");

        setTimeout(function(){

            next.removeEventListener("click", readGameRules02);

            rule02.forEach(function(rule){
                rule.classList.add("hide");
            })

            next.classList.remove("next2");
            next.classList.add("next3");
    
            rule03.classList.remove("hide");
            rule03a.classList.remove("hide");

            playerSpeach.classList.remove("stop-talking");
            playerSpeach.classList.add("speaking");

    
        },950)


        function readGameRules03() { 

            playerSpeach.classList.remove("speaking");
            playerSpeach.classList.add("stop-talking");
    
            setTimeout(function(){

                next.removeEventListener("click", readGameRules03);
                rule03.classList.add("hide");
                rule03a.classList.add("hide");
                next.classList.add("hide");
                startButton.classList.remove("hide");

                playerSpeach.classList.remove("stop-talking");
                playerSpeach.classList.add("speaking");


            },950)


            function renderAll() {

                playerSpeach.classList.remove("speaking");
                playerSpeach.classList.add("stop-talking");

                setTimeout(function(){

                    playerSpeach.classList.remove("stop-talking");

                    body.classList.add("stop-talking");
                    body.classList.remove("sky");

                    setTimeout(function(){
                        body.classList.add("speaking");
                        body.classList.add("b-background");
                        body.classList.add("center");  
                        gameRules.classList.add("hide");
                        rulesSection.classList.add("hide");

                        
                        gameCanvas.classList.remove("hide");
                        gameCanvas.classList.add("speaking");
    

                    },950)

                },1000)

            }
            
            startButton.addEventListener("click", renderAll)
        }

        next.addEventListener("click", readGameRules03);
   }

   next.addEventListener("click", readGameRules02);
}

next.addEventListener("click", readGameRules01);
})();

