const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailler = require("nodemailler");
require("dotenv").config();

admin.initializeApp();

const transporter = nodemailler.createTransporter({
    service : "gmail",
    auth:{
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});
    
// function to send email to users after booking for a location/stay

exports.sendEmailToUsers =functions.firestore
.documents("userRegistration/{docId")
.onCreate(async(snapshot)=>{
    const tourData = snapshot.data()
    const userEmail = tourData.email()

    const mailoptions ={
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject:"Crown Of Kenya",
        text: "HELLO"
    };
    try {
        await transporter.sendmail(mailoptions);
    } catch (error) {
        console.log("error sending email",error);
        
    }
});


