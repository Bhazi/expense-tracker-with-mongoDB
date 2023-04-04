document
  .getElementById("showLeaderBoard")
  .addEventListener("click", async () => {
    axios
      .get("http://localhost:4001/premium/leaderboard")
      .then((result) => {
        result.data.values.forEach((ress) => {
          // console.log(ress.loginId);
          showOnUserScreens(ress);
        });
      })
      .catch((err) => console.log(err));
    // });
  });

function showOnUserScreens(res) {
  console.log(res);
  const leaderboard = document.getElementById("leaderboards");
  var label = document.createElement("p");
  // label.id = res.loginId;
  label.textContent = `${res.name}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Total Expense is ${res.totalExpenses}`;
  leaderboard.appendChild(label);
}
