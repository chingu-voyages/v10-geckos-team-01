//log in
let loginForm;
if(document.querySelector('#login-form')) {
  loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //get user log in details
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value
    console.log(email, password)
    auth.signInWithEmailAndPassword(email, password)
      .then( (credential) => {
        console.log('success!')
      })
      .catch( err => console.log(err.message))
  })
}

auth.onAuthStateChanged( user => {
  if(user) {
    window.location = "index.html"
  }
})
