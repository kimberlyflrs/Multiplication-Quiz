//Quiz logic

var question = 1;
var correct = 0;
var time = 0;
var gameplay = "";


function Question(){
    //picks 2 random values on range
    var value1 = Math.floor(Math.random()*13);
    var value2 = Math.floor(Math.random()*13);
    var answer = value1*value2;

    var one = Math.floor(Math.random()*(10)+1);

    var val1 = Math.floor(Math.random()*((answer+one)-answer+1))+(answer+1);
    var val2 = Math.floor(Math.random()*((answer+one)-answer+1))+(answer+1);

    while (val1 == val2){
        val1 = Math.floor(Math.random()*((answer+one)-answer+1))+(answer+1);

    }
    //sets the boxes to the values
    document.getElementById("value1").innerHTML = value1;
    document.getElementById("value2").innerHTML = value2;

    //or we can have buttons with 3 options
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
        correct += 1;
        var score = "Correct: "+correct;
        document.getElementById("correct").innerHTML = score;
        //next question
        correctAnswer(id);
    }
    else{
        wrongAnswer(id);
    }
    document.getElementById('answer1').onclick="";
    document.getElementById('answer2').onclick="";
    document.getElementById('answer3').onclick="";

    question++;
    if (isItOver()){
        console.log('done game');
        showStats();
    }
    else{
        document.getElementById("next").style.visibility = "visible";
    }
}

function correctAnswer(id){
    //show the correct answer
    //highlight the the button you clicked
    document.getElementById(id).className = "btn btn-success answerbtn";
    document.getElementById("result").innerHTML="Correct";
    document.getElementById("result").style.visibility="visible";

}

function wrongAnswer(id){
    document.getElementById(id).className = "btn btn-danger answerbtn";
    document.getElementById("result").innerHTML="Wrong";
    document.getElementById("result").style.visibility="visible";
}

function isItOver(){
    //takes in a gameplay: random or timed
    if (gameplay=="random"){
        if(question>3){
            return true;
        }
    }
    if(gameplay=="timed"){
        if(time==0){
            return true;
        }
    }
    return false;
}

function showStats(){
    //shows time taken, correct questions, and play again button
    //
    var n = document.getElementById('finalStats');
    var p = document.getElementById('playAgain');

    var score = document.createElement('h3');
    var s;
    if (gameplay=="random"){
        s = document.createTextNode('Score: '+ correct + '/10');

    }
    else{
        s = document.createTextNode('Score: '+ correct );
    }
    score.appendChild(s);
    
    var times = document.createElement('h3');
    var t;
    if (gameplay=="timed"){
        t = document.createTextNode('Time: 60 seconds');
    }
    else{
        t = document.createTextNode('Time: '+ time+' seconds');
    }
    times.appendChild(t);

    n.appendChild(score);
    n.appendChild(times);

    var button = document.createElement('button');
    var b = document.createTextNode('Play Again');
    button.onclick = function(){playAgain()};
    button.className="btn btn-primary answerbtn";
    button.appendChild(b);

    p.appendChild(button);

    document.getElementById('question').style.visibility="hidden";
    document.getElementById('isItRight').style.visibility="hidden";
    document.getElementById('answers').style.visibility="hidden";
    document.getElementById('stats').style.visibility="hidden";
    document.getElementById('result').style.visibility='hidden';

}

function playAgain(){
    //resets the game, asks which gameplay they want
    question = 1;
    score = 0;
    addGameplay();
}

function NextBtn(){
    //displays next button
    document.getElementById("answer1").className = "btn btn-primary answerbtn";
    document.getElementById("answer2").className = "btn btn-primary answerbtn";
    document.getElementById("answer3").className = "btn btn-primary answerbtn";
    document.getElementById('answer1').onclick = function(){check('answer1')};
    document.getElementById('answer2').onclick = function(){check('answer2')};
    document.getElementById('answer3').onclick = function(){check('answer3')};

    document.getElementById("result").innerHTML="";
    Question();
    document.getElementById("next").style.visibility = "hidden";
}

function randomTimer(){
    //keeps count
    const timer = setInterval(() => {
        document.getElementById("timepassed").innerHTML = time;
        time += 1;
        if (question>10){
            clearInterval(timer);
        }
      }, 1000);
}

function timedTimer(){
    //keeps count
    const timer = setInterval(() => {
        document.getElementById("timepassed").innerHTML = time;
        time --;
        if (time==0){
            clearInterval(timer);
            showStats();
        }
      }, 1000);
}

function timeGameplay(){
    // setInterval() #gameplay
    time =60;
    correct=0;
    gameplay='timed';
    document.getElementById("correct").innerHTML = "Correct: 0";
    document.getElementById("timepassed").innerHTML = time;
    document.getElementById("stats").style.visibility="visible";
    removeSection("gameoption");
    document.getElementById("question").style.visibility="visible";
    document.getElementById("answers").style.visibility="visible";
    document.getElementById("answer1").className = "btn btn-primary answerbtn";
    document.getElementById("answer2").className = "btn btn-primary answerbtn";
    document.getElementById("answer3").className = "btn btn-primary answerbtn";

    timedTimer();
    Question();
 }

function randomGameplay(){
    //ten random questions
    time = 0;
    correct=0;
    gameplay='random';
    document.getElementById("correct").innerHTML = "Correct: 0";
    document.getElementById("timepassed").innerHTML = time;
    document.getElementById("stats").style.visibility="visible";
    removeSection("gameoption");
    document.getElementById("question").style.visibility="visible";
    document.getElementById("answers").style.visibility="visible";
    document.getElementById("answer1").className = "btn btn-primary answerbtn";
    document.getElementById("answer2").className = "btn btn-primary answerbtn";
    document.getElementById("answer3").className = "btn btn-primary answerbtn";

    randomTimer();
    Question();

}

function practiceGameplay(){
    //user picks times tables from 0-12
    showPracticeOptions();
}

function showPracticeOptions(){
    removeSection("gameoption");
    console.log('hello');
    var p = document.getElementById("playAgain");

    var title = document.createElement('h3');
    var t = document.createTextNode("Pick a multiplication table");
    title.appendChild(t);

    p.appendChild(title);
    for(var i=0; i<=12; i++){
        var button = document.createElement('button');
        var b = document.createTextNode(i);
        button.className = "btn btn-primary answerbtn";
        button.id = i;
        button.appendChild(b);
        p.appendChild(button);
    }

}

function startMultiplication(id){
    //display question, next button, keeps going in order from 0-12, next button should stop after you reach 12
    //options below 
}

function removeSection(id){
    //removes the gameplay option elements
    var n = document.getElementById(id);

    while (n.hasChildNodes()){
        n.removeChild(n.firstChild);
    }
}

function addGameplay(){
    //adds the gameplay options
    var n = document.getElementById("gameoption");

    var header = document.createElement("h4");
    header.innerHTML = "Choose a gameplay: ";
    //header.appendChild(message);

    var timeoption = document.createElement("button");
    timeoption.onclick = function(){timeGameplay()};
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
    randomoption.onclick = function(){randomGameplay()};
    randomoption.className="btn btn-primary randombtn";
    var rHeader = document.createElement('h6');
    var rTitle= document.createTextNode('Random');
    var rExplanation = document.createElement('p');
    var rMessage= document.createTextNode('10 random multiplication problems');
    rHeader.appendChild(rTitle);
    rExplanation.appendChild(rMessage);
    randomoption.appendChild(rHeader);
    randomoption.appendChild(rExplanation);

    n.appendChild(header);
    n.appendChild(timeoption);
    n.appendChild(randomoption);

    removeSection("finalStats");
    removeSection("playAgain");

}
