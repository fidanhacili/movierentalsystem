// const submitBtn = document.getElementById('submitRegister')

var email = $("#email");
var password = $("#password");
var passwordRep = $("#passwordRepeat");
var rememberMe = $("#remember");
var checkRepeatPassword = $(".checkRepeatPassword");

// submitBtn.addEventListener('click', ((e) => {
//     e.preventDefault()

//     const email_input = email.val()
//     const remember_input = rememberMe.val() //on-off
//     const password_input = passwordRep.val() //on-off
//     const passwordRep_input = passwordRep.val() //on-off

//     // localStorage.setItem('userEmail',email_input)

// }))

// Fetch all the forms we want to apply custom Bootstrap validation styles to
var form = document.querySelector(".needs-validation");

// Loop over them and prevent submission
form.addEventListener("submit", function (event) {
  const passwordControlCondition =
    Boolean(password.val()) && password.val() === passwordRep.val();
  console.log({ passwordControlCondition });
  console.log("validity", form.checkValidity());
  form.classList.add("was-validated");

  if (!form.checkValidity() || !passwordControlCondition) {
    event.preventDefault();
    event.stopPropagation();
    // form.classList.remove("was-validated");
    $(passwordRep).addClass("invalidPasswordRepeat");
    $(checkRepeatPassword).addClass("active");
    return;
  }

  $(passwordRep).removeClass("invalidPasswordRepeat");
  $(checkRepeatPassword).removeClass("active");

  if (form.checkValidity() && passwordControlCondition) {
    event.preventDefault();
    event.stopPropagation();
    console.log("submit oldu");

    // console.log('')

    const emailListFromLocalStorage = localStorage.getItem("emailList");
    if (
      Array.isArray(JSON.parse(emailListFromLocalStorage))
    ) {
        console.log({emailListFromLocalStorage})
      const emailList = [...JSON.parse(emailListFromLocalStorage)];
      emailList.push(email.val());
      localStorage.setItem("emailList", JSON.stringify(emailList));
    }
    else{
        localStorage.setItem("emailList", JSON.stringify([`${email.val()}`]));

    }
  }
});

console.log("local", JSON.parse(localStorage.getItem("emailList")));
