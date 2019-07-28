console.log('hello from create.js')

const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let category = document.querySelector('#question-category').value
  let qChoices
  if(document.querySelector('.multiple-container')){
    let multipleQuestionChoices = document.querySelector('.multiple-container')
    qChoices = [
      createForm['choice1'].value,
      createForm['choice2'].value,
      createForm['choice3'].value,
      createForm['choice4'].value
    ]
  } else {
    let tfQuestionChoices = document.querySelector('.tf-choices')
    qChoices = ["True", "False"]
  }
  //DATA WE ARE POSTING AS INTO NEW QUESTION
  let data = {
    qType: createForm['question-type'].value,
    questionText: createForm['question'].value,
    choices: qChoices,
    qTopic: category,
    answer: createForm['answer'].value
  }
  console.log(data)
  db.collection('users').doc(auth.currentUser.uid).collection('questions')
    .add(data)
    .then( () => {
      createForm.reset()
      document.querySelector('.success-message').style.display = "inline-block"
      window.location = "index.html"
    })
    .catch( err => console.log(err.message))
})

const qType = document.querySelector('#question-type')
const answersContainer = document.querySelector('.answer-choices-container')
const rightAnswerContainer = document.querySelector('.correct-answer-container')

qType.addEventListener('change', (e) => {
  console.log('we just changed the value for ', e.currentTarget)
  // show answer inputs based on type
  if(e.currentTarget.value == 'multiple') {
    answersContainer.innerHTML = multipleInputs
    rightAnswerContainer.innerHTML = multipleAnswers
  }else if(e.currentTarget.value == 'TorF'){
    answersContainer.innerHTML = trueFalseInputs
    rightAnswerContainer.innerHTML = tfAnswers
  }
})


const multipleInputs =  `
  <h5>Enter answer choices</h5>
  <div class="multiple-container"</div>
    <div class="input-field">
      <label for="choice">Choice 1</label>
      <input type="text" id="choice1" required />
    </div>
    <div class="input-field">
      <label for="choice">Choice 2</label>
      <input type="text" id="choice2" required />
    </div>
    <div class="input-field">
      <label for="choice">Choice 3</label>
      <input type="text" id="choice3" required />
    </div>
    <div class="input-field">
      <label for="choice">Choice 4</label>
      <input type="text" id="choice4" required />
    </div>
  `

const trueFalseInputs = `
  <h5>The Answer Choices</h5>
  <div class="tf-choices-container" id="tf-choices">
    <div>True</div>
    <div>False</div>
  </div>
  `

const multipleAnswers = `
  <h5>The correct answer is<h5>
  <div class="select-field">
    <select name="correct-choice" id="answer"/>
      <option value="choice1">Answer 1</option>
      <option value="choice2">Answer 2</option>
      <option value="choice3">Answer 3</option>
      <option value="choice4">Answer 4</option>
    </select>
  </div>
  `

const tfAnswers = `
  <h5>The correct answer is<h5>
  <div class="select-field">
    <select name="correct-choice" id="answer"/>
      <option value="True" id="answer-true">True</option>
      <option value="False" id='answer-false'>False</option>
    </select>
  </div>
  `
