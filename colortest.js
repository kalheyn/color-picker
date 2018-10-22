// RENDER GRID METHOD
var level = 0; 
var timer; 
var misclicks = 0; 
var timeRemaining = 15.0; 
var totalScore = 0; 

var container = $('#colorTestContainer');

function renderGrid() {
    if (level >= 58 || timeRemaining <= 0) gameOver(); 

    container.empty();

    let columns = setColumns(); 
    for (let i = 0; i < columns*columns; i++) {
        newTile(columns); 
    }
    setAnswer(columns); 
    colorGrid();

    $('#Answer').on("click", () => {
        level++;
        renderGrid(); 
    });

    if (level > 0) {
        $('.tile').not('#Answer').on("click", () => {
            badClick(); 
        })
    }


    startTimer(); 
    display();
};

function setColumns() {
    if(level<2) return 2;
	if(level<4) return 3;
	if(level<8) return 4;
	if(level<13) return 5;
	if(level<22) return 6;
	if(level<32) return 7;
	if(level<36) return 8;	
	if(level<40) return 9;	
	if(level<44) return 10;	
	if(level<48) return 11;	
	return 12;
};

function newTile(columns) {
    container.append('<div class="tile"></div>'); 
    $('.tile').css({
        'width': (100/columns).toString() + '%', 
        'height': (100/columns).toString() + '%'
    });
};


// SET ANSWER TILE
function setAnswer(column){
    let gridSize = column * column;
    let tileIndex = Math.floor(Math.random() * gridSize);
    $('.tile').eq(tileIndex).attr('id', 'Answer'); 
}

// RENDER COLOR
function colorGrid(){
    let colorChange = 1;
    if(level<=58) {
        var col=[105,75,60,45,30,20,18,16,15,15,15,14,14,14,13,13,13,12,12,12,11,11,11,10,10,9,9,8,8,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1,1];
        colorChange = col[level];        
    }

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let colorValue = 'rgb(' + (r-colorChange) + ',' + (g-colorChange) + ',' + (b-colorChange) + ')';
    $('.tile').css({
        'background-color' : colorValue
    });


    colorValue = 'rgb(' + r + ',' + g + ',' + b + ')';
    $('#Answer').css({
        'background-color' : colorValue
    });
}; 

// SET TIME AND COUNTDOWN
function startTimer(){
    if (level > 0) {
        stopTimer(timer); 
        timeRemaining = 15.0; 
        timer = setInterval(() => {
            let color = 'black';
            if (timeRemaining < 6) {
                color = 'red'; 
                $('#time').text((timeRemaining).toFixed(1)).css({
                    'color' : color
                });
            }
            else {
                $('#time').text((timeRemaining).toFixed(0)).css({
                    'color' : color
                });
            }

           

            if (timeRemaining <= 0.1) {
                $('#time').text("Game Over."); 
                gameOver(); 
                stopTimer(timer); // set to stop at 0.1 for display purposes
            }
            timeRemaining = timeRemaining - 0.1; 
        }, 100); 
    }
}; 

function stopTimer(timer){
    clearInterval(timer); 
};

//DISPLAY LEVEL
function display() {
    let displayString; 
    (level > 0) ? 
        displayString = ('SCORE: ' + level) 
        : displayString = "Which of the boxes has the different color?";
    $('#score').text(displayString);
};

//FOR MISCLICKS
function badClick() {
    let penalty = 3; 
    timeRemaining > penalty ? timeRemaining = timeRemaining - penalty : timeRemaining = 0; 
    misclicks ++; 
    $('#errors').text("ERRORS: " + misclicks); 
}

// GAME OVER
function gameOver() {
    container.empty(); 
    container.css({
        'height': '175px', 
    })
    let newGame = $('<br><button type="button" id="newgame" class="btn btn-success">New Game</button>'); 
    container.append(newGame);
    $('#newgame').on("click", () => {
        location.reload(); 
    })
};

//RUN CODE AFTER EVERYTHING IS LOADED
$(document).ready(function(){
    renderGrid(); 
});