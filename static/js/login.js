//log in
auth.onAuthStateChanged( user => {
  if(user) {
    window.location = "index.html"
  }
})

let loginForm;
if(document.querySelector('#login-form')) {
  loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //get user log in details
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value
    auth.signInWithEmailAndPassword(email, password)
      .then( (credential) => {
        console.log('success!')
      })
      .catch( err => console.log(err.message))
  })
}

let signupForm
if(document.querySelector('#signup-form')) {
  signupForm = document.querySelector('#signup-form')
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm['signup-email'].value
    const password = signupForm['login-password'].value
    auth.createUserWithEmailAndPassword(email, password)
    .catch( (err) => {
      console.log(err.message)
    })
  })

}
