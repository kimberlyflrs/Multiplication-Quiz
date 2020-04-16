//Quiz logic
//What the quiz will do 
/*
multiplication from 1-12 tables
user enters the answers
---show the two numbers, input the result
*shuffle the two numbers range from 0-12, save the answer
*show a score
*casual setting is 10 questions
*show if correct or wrong
*display next question
*show time it took to go through all of it
*at the end show
----time it took, number of correct answers, if passed or not 


bonus: countdown feature (do the most you can in a minute)
        ---display the time
possible feature: user can pick which times table they want to practice
*/
function StartQuiz(){
    //starts the quiz
    console.log('starting quiz');
    //show question
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

function check(){
    //checks if answer is correct
    var answer = document.getElementById("value1").innerHTML * document.getElementById("value2").innerHTML;
    if(answer == (value1*value2)){
        return true;
    }
    return false;
}

function timer(){
   // setInterval()
}
