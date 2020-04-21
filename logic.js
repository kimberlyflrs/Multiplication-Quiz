//Quiz logic
//What the quiz will do 
/*
multiplication from 1-12 tables
*show a score
*casual setting is 10 questions DONE
*show if correct or wrong
*display next question DONE
*show time it took to go through all of it DONE 1/2
*at the end show
----time it took, number of correct answers, if passed or not 


bonus: countdown feature (do the most you can in a minute)
        ---display the time
possible feature: user can pick which times table they want to practice
*/
var question = 1;
var correct = 0;
var time = 0;


function StartQuiz(){
    //starts the quiz
    console.log('starting quiz');
    //show question
    document.getElementById("question").style.visibility = "visible";
    document.getElementById("answers").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
    Question();
}

function Question(){
    //picks 2 random values on range
    //console.log(Math.floor(Math.random()*13)) //number from 0-12
    var value1 = Math.floor(Math.random()*13);
    var value2 = Math.floor(Math.random()*13);
    var answer = value1*value2;

    console.log(""+value1+" "+value2);
    //Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var one = Math.floor(Math.random()*(10)+1);

    var val1 = Math.floor(Math.random()*((answer+one)-answer+1))+(answer+1);
    var val2 = Math.floor(Math.random()*((answer+one)-answer+1))+(answer+1);

    while (val1 == val2){
        val1 = Math.floor(Math.random()*((answer+one)-answer+1))+(answer+1);

    }

    console.log("one: "+ val1);
    console.log("Two: "+ val2);
    //sets the boxes to the values
    document.getElementById("value1").innerHTML = value1;
    document.getElementById("value2").innerHTML = value2;

    //or we can have buttons with 3 options
    //1. answer 2. 3.
    //assign to random buttons
    assignBtn([answer, val1, val2]);
    document.getElementById("answer1").onclick = function(){check("answer1")};
    document.getElementById("answer2").onclick = function(){check("answer2")};
    document.getElementById("answer3").onclick = function(){check("answer3")};
}

function assignBtn(arr){
    //randomly assign an answer to a button
    var answers = shuffle(arr);

    document.getElementById("answer1").innerHTML = answers[0];
    document.getElementById("answer2").innerHTML = answers[1];
    document.getElementById("answer3").innerHTML = answers[2];

}

function shuffle(arr){
    //takes an array
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function check(id){
    //checks if answer is correct
    var answer = document.getElementById("value1").innerHTML * document.getElementById("value2").innerHTML;
    var c = document.getElementById(id).innerHTML;
    if(c == (answer)){
        //return true;
        //correct +1
        correct += 1;
        var s = "Correct: "+correct;
        document.getElementById("gameplay").innerHTML = s;
        //next question
        question+=1;
        console.log(question);
        if (isItOver('random')){
            console.log('done game');
        }
        else{
            Question();
        }
    }
    //return false;
}

function isItOver(gameplay){
    //takes in a gameplay: random or timed
    if (gameplay=="random"){
        if(question>10){
            console.log('over');
            return true;
        }
    }
    if(gameplay=="timed"){
        if(time==0){
            console.log('time done');
            return true;
        }
    }
    return false;
}

function playAgain(){
    //resets the game, asks which gameplay they want
    question = 1;
    score = 0;
    addGameplay();
}

function timeGameplay(){
   // setInterval() #gameplay
   
}


function showTimer(gameplay){
    //keeps count
    const timer = setInterval(() => {
        document.getElementById("timepassed").innerHTML = time;
        time += 1;
        if (question>3 && gameplay=='random'){
            clearInterval(timer);
        }
      }, 1000);
}

function randomGameplay(){
    //ten random questions
    document.getElementById("gameplay").innerHTML = "Correct: 0";
    document.getElementById("gameplay").style.visibility="visible";
    removeGameplay();
    document.getElementById("question").style.visibility="visible";
    document.getElementById("answers").style.visibility="visible";
    Question();
    showTimer('random');
}

function removeGameplay(){
    //removes the gameplay option elements
    var n = document.getElementById("gameoption");

    while (n.hasChildNodes()){
        n.removeChild(n.firstChild);
    }
}

function addGameplay(){
    //adds the gameplay options
    var n = document.getElementById("gameoption");

    var header = document.createElement("h4");
    var message = document.createTextNode = "Choose a gameplay: ";
    header.appendChild(message);

    var timeoption = document.createElement("button");
    timeoption.onclick = timeGameplay();
    timeoption.className= "btn btn-primary timebtn";
    var tHeader = document.createElement('h6');
    var tTitle= document.createTextNode('Time');
    var tExplanation = document.createElement('p');
    var tMessage= document.createTextNode('Answer as many as you can in a minute');
    tHeader.appendChild(tTitle);
    tExplanation.appendChild(tMessage);
    timeoption.appendChild(tHeader);
    timeoption.appendChild(tExplanation);

    var randomoption = document.createElement("button");
    randomoption.onclick = randomGameplay();
    randomoption.className="btn btn-primary randombtn";
    var rHeader = document.createElement('h6');
    var rTitle= document.createTextNode('Random');
    var rExplanation = document.createElement('p');
    var rMessage= document.createTextNode('10 random multiplication problems');
    rHeader.appendChild(rTitle);
    rExplanation.appendChild(rMessage);
    randomoption.appendChild(rHeader);
    randomoption.appendChild(rExplanation);
}
