const Expense = require("../models/expenseTracker");
const FilesDownloaded = require("../models/filesDownloaded");
const path = require("path");

const uploadToS3 = require("../services/S3services");

exports.getDownloadFile = async (req, res) => {
  try {
    const datas = await Expense.findAll({ where: { loginID: req.user } });
    const stringifiedDatas = JSON.stringify(datas);
    const fileName = `Expense${req.user}${new Date().getTime() * 8}.txt`;
    const fileURL = await uploadToS3(stringifiedDatas, fileName);
    console.log(fileURL);

    //adding links to the db of filesdownloaded
    await FilesDownloaded.create({
      linkURL: fileURL,
      name: req.names,
      loginId: req.user,
    });
    res.status(200).json({ fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ fileURL: "", success: false });
  }
};

exports.getDownloadedPage = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "views",
      "fileDownloaded",
      "downloadedFile.html"
    )
  );
};

exports.getDownloadedFiles = async (req, res) => {
  try {
    console.log("asdasdasdasdas", req.user);
    const datas = await FilesDownloaded.findAll({
      where: { loginId: req.user },
    });
    res.status(200).json({ datas: datas });
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
};
