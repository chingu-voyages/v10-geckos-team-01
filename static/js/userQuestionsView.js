console.log('hello from the view questions page')

auth.onAuthStateChanged( user => {
  if(user) {
    console.log('we are still logged in')
    // initialize page with user's topics
    getTopics()
  }
})



const getTopics = () => {
  let topicsContainer = document.querySelector('.topics-container')
  db.collection('users').doc(auth.currentUser.uid).collection('questions')
    .onSnapshot ( (snapshot) => {
      let questions = snapshot.docs
      //we now have an array of questions to work with
      console.log('we are running getTopics')

      //append questions to the question container
      let html = '<h4>Your Topics</h4>'
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
      topicsContainer.innerHTML = html

      const topicEls = document.querySelectorAll('.topic-link')
      for(let i = 0; i < topicEls.length; i++){
        topicEls[i].addEventListener('click', (e) => {
          console.log('clicking the topic event listener')
          getQuestions(e.target.textContent)
        })
      }
    }, err => {
      console.log(err.message)
    })
}


// when clicking topic, will change html to render questions and options to edit
// add event handler to EDIT and DELETE options
// render a form to appear above all the questions for EDIT
// add a prompt to confirm if we really want to DELETE
const getQuestions = (topic) => {
  let topicsContainer = document.querySelector('.topics-container')
  topicsContainer.style.display = "none"
  let questionsGrid = document.querySelector('.questions-container')
  questionsGrid.style.display = "grid"
  var goBack = document.querySelector('.goBack')
  goBack.style.display = "inline-block"

  db.collection('users').doc(auth.currentUser.uid).collection('questions')
  .where('qTopic', '==', topic)
  .onSnapshot ( (snapshot) => {
    let questions = snapshot.docs
    //we now have an array of questions to work with
    let html = `<h4>Your Questions</h4>`
    questions.forEach( d => {
      let div = `
        <div class="question-item" id="${d.ref.id.trim()}">${d.data().questionText}
          <div class="edit">Edit</div>
          <div class="delete">Delete</div>
        </div>
      `
      html += div
    })
    questionsGrid.innerHTML = html
    addEditHandlers()
    //set form id and set update button with handler

  }, err => {
    console.log(err.message)
  })
}

const addEditHandlers = () => {
  // select all edit elements and add event handler
  let editLinks = document.querySelectorAll('.edit')
  editLinks.forEach( link => {
    link.addEventListener('click', (e) => {
      //hide or unhide form
      editHandler()
      // grab form elements and populate with question details
      // qType, questionText, choices, qTopic, answer
      let qId = e.currentTarget.parentElement.id
      //set form id to be current question's id
      let updateButton = document.querySelector('.update-button')
      updateButton.id = qId
      console.log(updateButton)
      let category = document.querySelector('#question-category')
      let qText = document.querySelector('#question')

      let correct = document.querySelector('#correct')
      db.collection('users').doc(auth.currentUser.uid).collection('questions').doc(qId)
      .get()
      .then( doc => {
        console.log(doc.data())
        category.value = doc.data().qTopic
        qText.value = doc.data().questionText
        correct.value= doc.data().answer
        //set form based on question type MC or TorF
        console.log('is the qType multiple ?' , doc.data().qType == 'multiple')
        if(doc.data().qType == 'multiple') {
          setFormMC()
          let choice1 = document.querySelector('#choice1')
          let choice2 = document.querySelector('#choice2')
          let choice3 = document.querySelector('#choice3')
          let choice4 = document.querySelector('#choice4')
          choice1.value = doc.data().choices[0]
          choice2.value = doc.data().choices[1]
          choice3.value = doc.data().choices[2]
          choice4.value = doc.data().choices[3]
        } else {
          [choice1, choice2, choice3, choice4].forEach( input => {
            input.value = ""
          })
          document.querySelector('.answer-choices-container').style.display = "none"
        }
      })
    })
  })
}


// update the question in Firestore
const updateHandler = () => {
  let buttonId = document.querySelector('.update-button').id
  let category = document.querySelector('#question-category').value
  let qText = document.querySelector('#question').value
  let choice1 = document.querySelector('#choice1').value
  let choice2 = document.querySelector('#choice2').value
  let choice3 = document.querySelector('#choice3').value
  let choice4 = document.querySelector('#choice4').value
  let correct = document.querySelector('#correct').value

  let questionRef = db.collection('users').doc(auth.currentUser.uid).collection('questions').doc(buttonId)

  let data = {
    qTopic: category,
    questionText: qText,
    answer: correct
  }

  if(document.querySelector('.answer-choices-container').style.display !== 'none') {
    console.log('we are updating an MC question!')
    data.choices = [choice1, choice2, choice3, choice4]
  }
  return questionRef.update(data)
  .then( () => {
    console.log('question updated')
  })
  .catch( (error) => console.log(error.message) )
}

// open up a form dependent on question and render to top of screen
// should have a container set to display: none
// should reveal container and add form based on type of
const editHandler = () => {
  // make form visible when clicking edit button
  let formContainer = document.querySelector('.form-container')
  formContainer.style.display = "inline-block"

  let cancel = document.querySelector('.cancel')
  cancel.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('clicking cancel button')
    e.currentTarget.parentElement.reset()
    formContainer.style.display = "none"
  })
  let updateForm = document.querySelector('.update-form')
  let updateButton = document.querySelector('.update-button')
  updateForm.addEventListener('submit', (e) => {
    console.log('we added a listener to the update button')
    e.preventDefault()
    updateHandler()
  })
}

const setFormMC = () => {
  //if the question is MC, add the MC form inputs
  let html = `<label>Answer Choices</label>
        <input type="text" id="choice1" reqired/>
        <input type="text" id="choice2" reqired/>
        <input type="text" id="choice3" reqired/>
        <input type="text" id="choice4" reqired/>
        `
  let answerContainer = document.querySelector('.answer-choices-container')
  answerContainer.style.display = "block"
  answerContainer.innerHTML = html
}


const populateForm = () => {

}

document.querySelector('.goBack').addEventListener('click', (e) => {
    document.querySelector('.questions-container').style.display = "none"
    document.querySelector('.topics-container').style.display = "grid"
    getTopics()
    e.currentTarget.style.display = "none"
  })
