let topicSelection
let takeQuizLink

window.addEventListener('DOMContentLoaded', () => {
  topicSelection = document.querySelector('.topic-container')
  takeQuizLink = document.querySelector('#take-quiz')

  takeQuizLink.addEventListener('click', () => {
    topicSelection.style.display = "block"
    getTopics()
  })


})

const getTopics = () => {
  db.collection('users').doc(auth.currentUser.uid).collection('questions')
    .onSnapshot ( (snapshot) => {
      let questions = snapshot.docs
      //we now have an array of questions to work with
      //append questions to the question container
      let html = ''
      let topics = []
      questions.forEach ( d => {
        topics.push(d.data().qTopic)
      })
      let distinctTopics = [...new Set(topics)]
      distinctTopics.forEach( topic => {
        let link = `
          <div><a class="topic-link">${topic}</a></div>
        `
        html += link
      })
      topicSelection.innerHTML = html
      addLinkHandlers()
    }, err => {
      console.log(err.message)
    })
}

const addLinkHandlers = () => {
  let links = document.querySelectorAll('.topic-link')
  console.log('add link handlers')
  links.forEach( link => {
    link.addEventListener('click', linkHandler)
  })
}
const linkHandler = (e) => {
  let topic = e.target.textContent
  console.log(topic)
  let jsonObj = new Array
  // get questions based on topic selected and save to
  // local storage as JSON
  db.collection('users').doc(auth.currentUser.uid).collection('questions').where("qTopic", "==", topic)
    .get().then( (snapshot) => {
    	snapshot.forEach( doc => {
        jsonObj.push(doc.data() )
      })
      data = JSON.stringify(jsonObj)
      localStorage.setItem('userQuizObj', data)
      localStorage.setItem('cess_file', 'static/css/quiz.css')

      location = 'basicTerminology.html'
  	 })
     .catch( error => console.log(error.message) )


  //navigate to the quiz page
}
