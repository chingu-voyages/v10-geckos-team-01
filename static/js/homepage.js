
const greeting = document.querySelector('.welcome-message')
const createAccount = document.querySelector('.drop-down-button-right')
const loggedInContainer = document.querySelector('.loggedin-container')

// check for state changes in auth
// at moment, will only console log when user signs out
auth.onAuthStateChanged( user => {
  if(user) {
    greeting.textContent = `Welcome back ${user.email}`
    logout.style.display = "inline-block"
    loggedInContainer.style.display = "flex"
    createAccount.style.display = "none"
    console.log('user is signed in')
    // for admins
    /*
    user.getIdTokenResult().then(idTokenResult => {
      console.log(user)
      user.admin = idTokenResult.claims.admin
      // do something if user is admin
    })
    */
    // console.log('user logged in: ', user)
    // //get data
    // db.collection('terminology')
    //   .onSnapshot( (snapshot) => {
    //     setupQuestions(snapshot.docs)
    // }, err => {
    //   console.log(err.message)
    // })
  } else {
    console.log('Auth State: user currently logged out')
    greeting.textContent = "Guest"
    loggedInContainer.style.display = ""
    createAccount.style.display = ""
    logout.style.display = "none"
    // do something like hide elements if user is logged out
  }
})

const logout = document.querySelector('.logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut()
      .then( () => {
        console.log('Sign Out Event: user has signed out!')
      })
  })
