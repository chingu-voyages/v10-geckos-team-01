// JavaScript code for Chingu V10 Geckos team 1
// set a css for the basic html template of quiz
function set_css() {
    try {
        let newcss = window.localStorage.getItem('cess_file');
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = newcss;
        link.media = 'all';
        head.appendChild(link);
    }
    catch (err) {
        console.log("Error retrieving localStorage item: cess_file")
        console.log(err.message);
    }
}

/*
function set_tags() {
  try {
    let new_title = localStorage.getItem('WhichQuiz');
    var title = document.getElementsByTagName('title')[0];
    console.log(title);
    if (new_title == 'one'){
      title.innerHTML = 'Basic Terminology';
    }
    if (new_title == 'two') {
      title.innerHTML = 'Strings and Things';
    }
    if (new_title == 'three') {
      title.innerHTML = 'Getting Technical';
    }
  }
  catch (err) {
    console.log("Error retrieving -WhichQuiz- from localStorage.")
    console.log(err.message);
  }
}

function set_page() {
  set_css();
  set_tags();

}
*/

window.onload = set_css();
