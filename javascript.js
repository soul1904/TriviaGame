

$(document).ready(function () {
    // $(document).ready(function() {
    // $("#my_audio").get(0).play();
    // });
    // window.onload = function() {
    //     document.getElementById("#my_audio");
    // }

    //Creating an array of objects with the questions, answer options, and correct answer
    var questions = [
        {
            question: "what was the first movie in the marvel cinematic universe?",
            choices: [" IRON-MAN ", " THE INCREDIBLE HULK ", " CAPTAIN AMERICA ", " THOR "],

            choicesAnswer: 0
        },
        {
            question: "What character did Jon Favreau pla in the mcu?",
            choices: ["PETER PARKER", "HAPPY HOGAN", "JARVIS", "HOWARD STARK"],
            choicesAnswer: 1
        },
        {
            question: "who directed the seecond captain america movie?",
            choices: ["JON FAVREAU", "TAIKA WAITITI", "JAMES GUNN", "THE RUSSO BROS"],
            choicesAnswer: 3
        },
        {
            question: "how many infinity stones are there?",
            choices: ["THREE", "ONE", "SIX", "FIVE"],
            choicesAnswer: 2
        },
        {
            question: "who was the first character to die in infinity war?",
            choices: ["SPIDER-MAN", "HEIMDALL", "TIM", "LOKI"],
            choicesAnswer: 3
        },
        {
            question: "who is the king of wakanda",
            choices: ["KING LOUIE", "BRUCE BANNER", "TACHALA", "TACHA KA"],
            choicesAnswer: 2
        }];

    var questionCounter = 0;

    //Waiting to show the user choice result 
    var wait = 900;

    //Creating score variables
    var correct = 0;
    var incorrect = 0;
    var missed = 0;

    //Creating array of user's answers
    var userChoice = [];



    //Function to submit answers
    function submitAns() {
        $("#submit").on("click", function (event) {
            event.preventDefault();
            userChoice.length = 0;

            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userChoice.push(userSelection);
            console.log(userChoice);
            nextQ();
        });
    };

    //Creating question timer variables & functions
    var timeLeft = 20;
    var increment;

    function runTimer() {
        increment = setInterval(decrement, 1000);
    };

    function decrement() {
        timeLeft--;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userChoice.length = 0;
            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userChoice.push(userSelection);
            console.log(userChoice);
            nextQ();
        };
    };

    function resetTimer() {
        timeLeft = 20;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    };

    function displayTimer() {
        $("#time-left").html("Answer Review");
    };

    function stopTimer() {
        clearInterval(increment);
    };

    //Function to display the given response options
    function createRadios() {
        var responseOptions = $("#responses");
        //Empty array for user answer
        responseOptions.empty();

        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] + '"><div class="label">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
        };
    };

    //Function to display the given question
    function displayQ() {
        clearQ();
        resetTimer();
        $(".questionX").html(questions[questionCounter].question);
        //Calling the function to display the response options
        createRadios();
        //Creating submit button
        $("#submit-div").append('<button type="submit" id="submit">' + "Next Question" + '</button>');
        runTimer()
        submitAns();
    };

    //Display start page
    function displayStart() {


        $("#content").append('<button id="start-button">' + " CLICK TO START " + '</button>');
        //Start game
        $("#start-button").on("click", function (event) {

            event.preventDefault();
            //Displays the first question
            firstQ();
            resetTimer();
        });
    };

    //Reset for end of game
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        missed = 0;
        userChoice = [];
        resetTimer();
    };

    //Display end page
    function displayEnd() {
        clearQ();
        $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
        //Restart game
        $("#restart-button").on("click", function (event) {
            event.preventDefault();
            //Displays the first question
            reset();
            clearQ();
            displayStart();
        });
    };

    //Function to clear the question
    function clearQ() {
        var questionDiv = $(".questionX");
        questionDiv.empty();

        var responsesDiv = $("#responses");
        responsesDiv.empty();

        var submitDiv = $("#submit-div");
        submitDiv.empty();

        var contentDiv = $("#content");
        contentDiv.empty();

        stopTimer();
    };

    //Showing whether answer was right/wrong
    function checkQ() {
        clearQ();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userChoice[0] == questions[questionCounter].choicesAnswer) {
            $("#content").html('<h1>' + "Correct!!!" + '</h1>');
            correct++;
            displayTimer();
        }
        else if (userChoice[0] === undefined) {
            $("#content").html('<h1>' + "Time's up!" + '</h1><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            missed++;
            displayTimer();
        }
        else {
            $("#content").html('<h1>' + "You chose the wrong answer." + '</h1><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            incorrect++;
            displayTimer();
        };
    };

    //Function to change the question 
    function nextQ() {
        checkQ();

        questionCounter++;
        //If the count is the same as the length of the question array, the counts reset to 0
        if (questionCounter === questions.length) {
            setTimeout(displayEnd, wait);
        }
        else {
            setTimeout(displayQ, wait);
        };
    };

    //Function to call the first question
    function firstQ() {
        var startContent = $("#content");
        startContent.empty();
        displayQ();
    };

    //Displays the start page
    displayStart();

});