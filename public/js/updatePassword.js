const value1 = document.URL.slice(45, 81);
document
  .getElementById("updatePasswordForm")
  .addEventListener("submit", async (e) => {
    console.log("clicked");
    e.preventDefault();
    var passwordOne = document.getElementById("passwordOne").value;
    var passwordTwo = document.getElementById("passwordTwo").value;

    if (passwordOne == passwordTwo) {
      const token = localStorage.getItem("Token");
      await axios
        .post(
          `http://localhost:4001/password/resetpassword/${value1}`,
          {
            password: passwordOne,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => {
          console.log(response);
          window.location = "http://localhost:4001/login";
        })
        .catch((err) => console.log(err));
    } else {
      var errorMessageDiv = document.getElementById("errMessageDiv");
      var errorMessage = document.createElement("p");
      errorMessage.id = "errorMessage";
      errorMessage.textContent = "Password doesn't match";
      errorMessageDiv.appendChild(errorMessage);
    }
  });
