let colorsArray = ["green", "red", "yellow", "blue"];

let sequenceArray = [];
let newSequenceArray = [];
let index = 0;
let startedGame = false;

function nextColor(){
    let randomNumber = Math.floor((Math.random() * 4));
    let color = colorsArray[randomNumber];
    return color;
}

$(document).keydown(function(event){
    if (!startedGame){
        startedGame = true;
        $("#level-title").text("Level "+(index+1));
        reset();
    }
});


$(".btn").click(function() {
    if (startedGame==true){
        pressedButtonEffect($(this));
        playSound(this.id);
        newSequenceArray.push(this.id);
        if(newSequenceArray[index] == sequenceArray[index]){
            if (index == sequenceArray.length-1){
                $("#level-title").text("Level "+(index+2));
                reset();
            }
            else { 
                index += 1;
            }
        }
        else {
            gameOver();
            sequenceArray = [];
            $("#level-title").text("Game Over - Press any key to restart");
            startedGame = false;
            //reset();
            
        }

    }

});

function reset() {
    let siguienteColor = nextColor();
    setTimeout(function() {
        sequenceArray.push(siguienteColor);
        //pressedButtonEffect($("#"+siguienteColor));
        $("#"+siguienteColor).fadeIn(100).fadeOut(100).fadeIn(100);
        newSequenceArray = [];
        playSound(siguienteColor);
        index = 0;
    }, 800);
    return siguienteColor;
}


function pressedButtonEffect(event) {
    event.addClass("pressed");
    setTimeout(function() {
        event.removeClass("pressed");
    }, 300);
}


function gameOver() {
    //let gameOverSound = new Audio("sounds/wrong.mp3");
    //gameOverSound.play();
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

function playSound(soundFileName) {
    let sound = new Audio("sounds/"+soundFileName+".mp3");
    sound.play();
}