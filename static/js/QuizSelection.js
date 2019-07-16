// JavaScript source code for Chingu V10 Geckos team 1
// by the choice of which quiz the user picks:
// send them to a base template quiz (basicTerminology.html), where css determines design
// and json data determines the quiz questions.
// json data is selected in the javascript by the variable 'WhichQuiz'
const base_html = 'basicTerminology.html';


function load_one_html() {
    localStorage.setItem('cess_file', 'static/css/quiz.css');
    localStorage.setItem('WhichQuiz', 'one');
    window.location = base_html;
}

function load_two_html() {
    localStorage.setItem('cess_file', 'static/css/quiz2.css')
    localStorage.setItem('WhichQuiz', 'two');
    window.location = base_html;
}
function load_three_html() {
    localStorage.setItem('cess_file', 'static/css/quiz3.css')
    localStorage.setItem('WhichQuiz', 'three');
    window.location = base_html;

}

window.onload = function() {
    let one_link = document.getElementById("quizOne");
    one_link.addEventListener('click', load_one_html);
    let two_link = document.getElementById("quizTwo");
    two_link.addEventListener('click', load_two_html);
    let three_link = document.getElementById("quizThree");
    three_link.addEventListener('click', load_three_html);

};
