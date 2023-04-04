document.getElementById("downloadFile").addEventListener("click", async (e) => {
  const token = localStorage.getItem("Token");
  await axios
    .get("http://localhost:4001/download", {
      headers: { Authorization: token },
    })
    .then((response) => {
      if (response.status == 200) {
        var a = document.createElement("a");
        a.href = response.data.fileURL;
        a.download = "myexpense.txt";
        a.click();
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch(console.log);
});

document
  .getElementById("fileDownloaded")
  .addEventListener("click", async (req, res) => {
    window.location = "http://localhost:4001/downloaded/mainPage";
  });
