const submitBtn = document.getElementById('submitBtn')

var myForm = $('#loginForm')
var email = $('#email')
var password = $('#password')
var rememberMe = $('#rememberMe')


submitBtn.addEventListener('click', ((e) => {
    e.preventDefault()

    const email_input = email.val()


    const emailList = JSON.parse(localStorage.getItem('emailList'))
    
    if(Array.isArray(emailList) && emailList.length) {

            if(emailList.includes(email_input)) {

                localStorage.setItem('currentUser',email_input )
                window.location.href = '/index.html'

            }else{
                alert('Qeydiyyatdan kecmemisiz')
            }
    }
}))
