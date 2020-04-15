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
    console.log(Math.floor(Math.random()*(answer-value1)));
    console.log(Math.floor(Math.random()*(answer-value2)));
    //sets the boxes to the values
    document.getElementById("value1").innerHTML = value1;
    document.getElementById("value2").innerHTML = value2;

    //or we can have buttons with 3 options
    //1. answer 2. 3.
}

function check(value1, value2, answer){
    //checks if answer is correct
    if(answer == (value1*value2)){
        return true;
    }
    return false;
}
