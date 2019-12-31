//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require('nodemailer');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/my-work", (req, res) => {
  res.render("my-work");
});

app.get("/longhornstartup", (req, res) => {
  res.redirect("http://www.longhornstartup.com");
});

app.get("/buckscupofjoe", (req, res) => {
  res.redirect("http://www.buckscupofjoe.com");
});

app.get("/usat", (req, res) => {
  res.redirect("https://usatstore.com/");
});

app.get("/playtri", (req, res) => {
  res.redirect("https://www.playtri.com/");
});

app.get("/thepeddler", (req, res) => {
  res.redirect("http://www.peddlernet.com/");
});

app.post("/contact", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let company = req.body.company;
  let message = req.body.message;

  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: name + ' &lt;' + email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New Customer Response from lufkinswebdesigner.com ',
    html: `<p>${name} (${email}) from the company ${company} sent the following message:</p> <p>${message}</p> <p>From,</p> <p>${name}</p> <p>${email}</p> <p>${phone}</p> <p>${company}</p>`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact-failure');
    }
    else {
      res.render('contact-success');
    }
  });
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
