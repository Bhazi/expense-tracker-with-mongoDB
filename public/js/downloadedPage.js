window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("Token");
  await axios
    .get("http://localhost:4001/downloaded/links", {
      headers: { Authorization: token },
    })
    .then((response) => {
      response.data.datas.forEach((data) => {
        showOnScreen(data);
        console.log(data);
      });
    })
    .catch(console.log);
});

function showOnScreen(e) {
  const div = document.getElementById("downloaded");
  const ul = document.createElement("ul");
  const a = document.createElement("a");
  a.textContent = `File${e.id}`;
  a.style.fontFamily = "Arial";
  a.href = e.linkURL;
  a.download = "undefined.txt";
  ul.appendChild(a);
  div.appendChild(ul);
}
