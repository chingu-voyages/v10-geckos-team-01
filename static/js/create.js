console.log('hello from create.js')

const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let category = document.querySelector('#question-category').value
  let qChoices
  let qAnswer
  if(document.querySelector('.multiple-container')){
    let multipleQuestionChoices = document.querySelector('.multiple-container')
    qChoices = [
      createForm['A'].value,
      createForm['B'].value,
      createForm['C'].value,
      createForm['D'].value
    ]

    qAnswer = document.querySelector(`.${createForm['answer'].value}`)
  } else {
    let tfQuestionChoices = document.querySelector('.tf-choices')
    qChoices = ["True", "False"]
    qAnswer = createForm['answer']
  }
  //DATA WE ARE POSTING AS INTO NEW QUESTION
  let data = {
    qType: createForm['question-type'].value,
    questionText: createForm['question'].value,
    choices: qChoices,
    qTopic: category,
    answer: qAnswer.value
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
      <label for="choice">Choice A</label>
      <input type="text" class="A" id="A" required />
    </div>
    <div class="input-field">
      <label for="choice">Choice B</label>
      <input type="text" class="B" id="B" required />
    </div>
    <div class="input-field">
      <label for="choice">Choice C</label>
      <input type="text" class="C" id="C" required />
    </div>
    <div class="input-field">
      <label for="choice">Choice D</label>
      <input type="text" class="D" id="D" required />
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
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
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
