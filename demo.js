var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
app.listen(9999);

app.get("/", (req, res) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            type: 'OAUTH2',
            user: 'patelnokano000@gmail.com',
            clientId: '67052588834-mk4nh286olopiqjo696603gb0pfkpicm.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04xp4_bTEsMFsCgYIARAAGAQSNwF-L9IrupL4bNSPgMpWWyb4nR5KE8f1XcPT8fdMLNcre8SsZ5Ghs38i9WwlHF9xQ5J2-fJkDY0',
            accessToken: '9q3vfhm7ya29.a0AVvZVsoqJopwfoqIBi5-_sdafAw1zZckMeoedjBD9d3OLJQgFezbWf7S8PPeDHU2fTRXJRwx5Cz1GtehkyP_c0QyGPbUaKDCue-RvbQG-LdfQFvvOBbn4vLGHvkZhIq2fYTKaHz-4mfXwIt4UsevMR2emoVoaCgYKAaQSARISFQGbdwaIqsWV_S0x_78ZJCFS-Wxg8Q0163l33rus21toc8fndupq76itje',
        }
    });

    let info = transporter.sendMail({
        from: 'hello <patelnokano000@gmail.com>', // sender address
        to: 'kevinbhimani3112@gmail.com', // list of receivers
        subject: "Test Message ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    res.json({
        code
    })
})