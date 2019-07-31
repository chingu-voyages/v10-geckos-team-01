// JavaScript source code for QuizMockV10
let testing_something; // for 'set_a_constant'() test
// local Storage item WhichQuiz  will tell us which json to use.
let which_quiz;
//  Quiz elements to be written to DOM

var questions;  // used for length of JSON array
var json_question;  // for JSON load
let json_answer;    // for JSON load
let correct;  // JSON
let dict;     // jSON
let hint;   // <-- NEW

// document elements to be modified by json data
let Quiz_question;
let answer_a;
let answer_b;
let answer_c;
let answer_d;
let answer_T;
let answer_F;
let box_type;
let code_box; //<-- NEW

// constants NOT from JSON, control items
let current_answer;
let current_index;
// items that show during quiz DOM elements to alter
let results;
let which_question;
let quiz_box;
let true_false_box;
let quiz_buttons;
let continue_btn;
let h3Hint;
let code_box_display; //<-- NEW
//items to hide on start of quiz ----
let image1_display;
let start_button;
let instructions;
//items to display at end of quiz ----
let image2_display;
let congrats;

let takeUserQuiz // boolean

// get user questinos from local Storage
function getUserQuestions(i) {
  if(JSON.parse(localStorage.getItem('userQuizObj'))) {
    takeUserQuiz = true

    console.log('we have a user quiz!')
    dict = JSON.parse(window.localStorage.getItem('userQuizObj'))
  }
  questions = dict[i];
  var fetchedQuestion = questions.questionText;
  json_question = fetchedQuestion;
  var fetchedCorrect = questions.answer // note diff key name
  correct = fetchedCorrect;
  var fetchedAnswer = questions.choices // note diff key name
  json_answer = fetchedAnswer;
  var fetchedHint = "to be added later" // need to add to firestore
  hint = fetchedHint;   //<------- NEW
  var ques_num = i + 1;
  var message = "Question number:  " + " " + ques_num;
  which_question.innerHTML = message;
  which_question.style.display = 'inline';
  Quiz_question.innerHTML = json_question;
  //console.log("Quiz_question=")
  var fetchedBoxType = questions.qType;
  box_type = fetchedBoxType;
  var fetchedCodeBox = "none";
  code_box = fetchedCodeBox;
    if (box_type == "multiple") {
        if (code_box == 'none'){
          setQuizBoxType(true, false);
          let options = json_answer;
          // question chioces represented by Array in Firestore
          answer_a.innerHTML = options[0];
          answer_b.innerHTML = options[1];
          answer_c.innerHTML = options[2];
          answer_d.innerHTML = options[3];
        }

        else {
          setQuizBoxType(true, true);
          let options = json_answer;
          code_box_display.innerHTML = code_box;
          console.log(options);
          answer_a.innerHTML = options[0];
          answer_b.innerHTML = options[1];
          answer_c.innerHTML = options[2];
          answer_d.innerHTML = options[3];

        }
    }
    else  {
        setQuizBoxType(false, false);
        let options = json_answer;
        console.log(options);
        answer_T.innerHTML = options[0];
        answer_F.innerHTML = options[1];
    }
};


//removed all old functions.  Json holds our data now.
function retrieve_JSON(i) {
    return fetch('static/data/quiz_obj.json')
        .then(response => {
            console.log("getting json response...")
            return response.json()
        })
        .then(data => {
            console.log("Assigning data to constants")
            // Work with JSON data here
            // had to add a _j  at the end of my content
            // because of variables declared above, these must be different
            //----------------------------------------//
            //          data format:
            // array:[
            // quiz content {
            //               'question_j': 'string',
            //               'correct_j' : 'string',
            //               'box_type_j'  : 'string',
            //               'hint_j' : 'string',
            //               'answers_j' : object{
            //                           'a': 'string',
            //                           'b': 'string',
            //                           'c': 'string',
            //                           'd': 'string'
            //                           }
            //               },
            // next content (same as above)  {
            //               'question_j': 'string',
            //               'correct_j' : 'string',
            //               'box_type_j'  : 'string',
            //               'hint_j'   : 'string',
            //               'answers_j' : object{
            //                           'a': 'string',
            //                           'b': 'string',
            //                           'c': 'string',
            //                           'd': 'string'
            //                           }
            //               },
            //  box_type 'TorF'  does not require answers.

            if(which_quiz == 'one'){
              dict = data.quizone;
            }
            if(which_quiz == 'two'){
              dict = data.quiztwo;
            }
            if(which_quiz == 'three'){
              dict = data.quizthree;
            }

            questions = dict[i];
            console.log("array length:");
            console.log(dict.length);
            var fetchedQuestion = questions.question_j;
            json_question = fetchedQuestion;
            var fetchedCorrect = questions.correct_j;
            correct = fetchedCorrect;
            var fetchedAnswer = questions.answers_j;
            json_answer = fetchedAnswer;
            var fetchedHint = questions.hint_j; //<--- NEW
            hint = fetchedHint;   //<------- NEW
            var ques_num = i + 1;
            var message = "Question number:  " + " " + ques_num;
            which_question.innerHTML = message;
            which_question.style.display = 'inline';
            Quiz_question.innerHTML = json_question;
            //console.log("Quiz_question=")
            var fetchedBoxType = questions.box_type_j;
            box_type = fetchedBoxType;
            var fetchedCodeBox = questions.code_box_j;
            code_box = fetchedCodeBox;
            if (box_type == "multiple") {
                if (code_box == 'none'){
                  setQuizBoxType(true, false);
                  let options = json_answer;
                  //console.log("options = ", options);
                  answer_a.innerHTML = options.a;
                  answer_b.innerHTML = options.b;
                  answer_c.innerHTML = options.c;
                  answer_d.innerHTML = options.d;
                }
                else {
                  setQuizBoxType(true, true);
                  let options = json_answer;
                  code_box_display.innerHTML = code_box;
                  console.log(options);
                  answer_a.innerHTML = options.a;
                  answer_b.innerHTML = options.b;
                  answer_c.innerHTML = options.c;
                  answer_d.innerHTML = options.d;

                }
            }
            else  {
                setQuizBoxType(false, false);
                let options = json_answer;
                console.log(options);
                answer_T.innerHTML = options.T;
                answer_F.innerHTML = options.F;
            }




        })
        .catch(err => {
            // Do something for an error here
            console.log(err)
            console.log("JSON file is not accessable or error in data assignment.")
        })
};




function setDOMconstants() {

    // the local storage item WhichQuiz tells us which json data to use.
    which_quiz = localStorage.getItem('WhichQuiz');

    // DOM elements not affected by JSON
    current_index = 0;
    which_question = document.getElementById('which_question');
    quiz_box = document.getElementById("quiz_box");
    true_false_box = document.getElementById("true_false_box");
    start_button = document.getElementById("start_button");
    image1_display = document.getElementById("image1");
    instructions = document.getElementById("instructions");
    image2_display = document.getElementById("image2");
    congrats = document.getElementById("congrats"); //starts at display: none
    results = document.getElementById("results");


    // if we do only one question on the page, these elements don't ever need to change
    // These are DOM elements set by JSON
    Quiz_question = document.getElementById("question");
    answer_a = document.getElementById("answerA");
    answer_b = document.getElementById("answerB");
    answer_c = document.getElementById("answerC");
    answer_d = document.getElementById("answerD");
    answer_T = document.getElementById("True_line");
    answer_F = document.getElementById("False_line");
    quiz_buttons = document.getElementById("quiz_buttons");
    continue_btn = document.getElementById("continue_btn");
    h3Hint = document.getElementById("give_hint");
    code_box_display = document.getElementById("code_box");
    // hiding and showing elements on page:

    hide_element(start_button);
    hide_element(image1_display);
    hide_element(instructions);   // maybe move end elements and start elements to entire function?
    hide_element(congrats);
    hide_element(image2_display);
    hide_element(continue_btn); //<-- I shouldn't have to hide this where is it changing on load?
    show_element(quiz_box);
    load_quiz_buttons(quiz_buttons);

};


function loadCurrentQuestion(i) {
  // if user has their own questions loaded, get those
  if(JSON.parse(localStorage.getItem('userQuizObj'))) {
      getUserQuestions(i)
  } else {
    retrieve_JSON(i)
  }
};

function hide_element(element) {
    //console.log(element);
    element.style.display = 'none';
}

function show_element(element) {
    element.style.display = 'inline-block';
}

function load_quiz_buttons(element) {
  element.style.display = 'flex';
}

function show_continue_btn(element){
  element.style.display = 'block';
}

function displayHint() {
  //h3Hint = dom element, hint=JSON fetched string
  h3Hint.innerHTML = hint;
  show_element(h3Hint);
}


function setQuizBoxType(multiple, code_inside) {
    if (multiple == true && code_inside == false) {
      // Multiple choice, no code box
        console.log("multiple choice, no code block");
        quiz_box.style.display = 'inline-block';
        true_false_box.style.display = 'none';
        code_box_display.style.display = 'none';
    }
    if (multiple == false) {
      // True or False question
        console.log("True or False box");
        code_box_display.style.display = 'none';
        quiz_box.style.display = 'none';
        true_false_box.style.display = 'inline-block';
    }
  if (multiple && code_inside){
      // multiple choice with code box
      console.log("else clause, multiple with code block")
      code_box_display.style.display = 'block';
      quiz_box.style.display = 'inline-block';
      true_false_box.style.display = 'none';

    }
};
/*
 *   end JSON  functions.
*/
function end_quiz(){
  hide_element(quiz_box);
  hide_element(true_false_box);
  hide_element(results);
  hide_element(which_question);
  hide_element(Quiz_question);
  hide_element(quiz_buttons);
  hide_element(continue_btn);
  hide_element(h3Hint);
  hide_element(code_box_display);
  show_element(congrats);
  show_element(image2_display);
}


function reset_question(){
  hide_element(results);
  hide_element(continue_btn);
  hide_element(h3Hint);
  hide_element(code_box_display);
  loadCurrentQuestion(current_index);
}

function check_answer(answer) {
    // if the clicked item matches the place in list "a" == "a"
    // else:  result == try again.
    //hide_element(continue_btn); //<-- should be none' before this is run
    var valid = correct;
    let previous_index = current_index;
    if (answer == valid) {
        results.style.display = 'inline';
        results.innerHTML = 'Fantastic!';
        current_index += 1;

        //move on to next question  i = i+1 load_quiz(i)
        if (current_index < dict.length) {
            show_continue_btn(continue_btn); //<-- this button needs to be block
            //load_quiz(current_index);
        }
        else {
            //end quiz
            end_quiz(); //<-- NEW 7-28-19 1:44am
        }
    }
    else {
        current_index = previous_index;
        results.style.display = 'inline';
        results.innerHTML = 'Try again.';
    }
}


function set_current_answer() {
  if(JSON.parse(localStorage.getItem('userQuizObj'))) {
    current_answer = this.nextElementSibling.textContent
    console.log(current_answer)
  } else {
    current_answer = this.id;
  }
  check_answer(current_answer);
};

function presentOption() {
  let selection = this.id;
  let min = current_index;
  let max = dict.length;
  console.log(selection);
  if(selection == 'previous' && min > 0){
    current_index -=1;
    hide_element(continue_btn);
    hide_element(results);
    hide_element(h3Hint);
    retrieve_JSON(current_index);
  }
  if(selection == 'skip' && current_index + 1 < max){
    current_index += 1;
    hide_element(continue_btn);
    hide_element(results);
    hide_element(h3Hint);
    retrieve_JSON(current_index);
  }
  // need to add hints in json for the 'hint' button
  // this selection('hint') will do nothing until I add the if()
};

function addEventHandlersToButtons() {
    // add event listeners to answer_a, b, c, d elements.
    // user clicks one of the answers and recieves results.
    // I was going to add event listener but not sure how to add the 'a b c d' or whatnot.....
    let choices = document.getElementsByClassName('quiz_answers');
    for (let i = 0; i < choices.length; i++) {
        let element = choices[i];
        //let answer = element.id;

        //console.log(answer);
        element.addEventListener("click", set_current_answer);

    };
    let skip = document.getElementById("skip");
    let previous = document.getElementById("previous");
    let proceed = document.getElementById("continue_btn");
    let give_hint = document.getElementById("hint_button");
    skip.addEventListener('click', presentOption);
    previous.addEventListener('click', presentOption);
    proceed.addEventListener('click', reset_question);
    give_hint.addEventListener('click', displayHint);
};

/*   test functions:
* test our constants have been loaded
 *
function set_a_constant() {
    testing_something = document.getElementById("constant");
    console.log("id = constant");
    console.log(testing_something);
    document.getElementById("constant").style.color = 'green';
};
function test_constants() {
    set_a_constant(); //html element for this is commented out in html file
    console.log("id=question");
    console.log(Quiz_question);
    console.log("id=answerA");
    console.log(answer_a);
    console.log("id=answerB");
    console.log(answer_b);
    console.log("id=answerC");
    console.log(answer_c);
    console.log("id=answerD");
    console.log(answer_D);
};
*/

function start_quiz() {
    // set our constants now that page is loaded:
    //updatePageWithNewElements()
    setDOMconstants();
    addEventHandlersToButtons()
    loadCurrentQuestion(current_index);

    //test *since button can only be clicked after screen load, these constants should exist (not null):
    //test_constants()
};

// load it up using a start button to set all the values.
// that way all elements are loaded before we modify them.
