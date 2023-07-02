const router = require("express").Router();
const Email = require("../models/Email");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();

const ses = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const createSendEmailCommand = (toAddress, fromAddress, body) => {
    return new SendEmailCommand({
        Destination: {
        ToAddresses: [toAddress],
        },
        Message: {
        Body: {
            Text: {
            Charset: "UTF-8",
            Data: `
            ${body.name}様
            
            この度は【岡田茂之ポートフォリオサイト】からのお問い合わせありがとうございます。
            内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。
            3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。

            ===================================

            お名前：${body.name}
            メールアドレス：${body.email}
            内容
            ${body.content}

            ===================================
            
            ○●-----------------------●○

            Webエンジニア
            岡田　茂之
            okada shigeyuki

            info_os-create@os-create.com

            ○●-----------------------●○
            `,
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: "【os-create】お問い合わせありがとうございます。",
        },
        },
        Source: fromAddress
    });
};


const createAdminEmailCommand = (toAddress, fromAddress, body) => {
    return new SendEmailCommand({
        Destination: {
        ToAddresses: [toAddress],
        },
        Message: {
        Body: {
            Text: {
            Charset: "UTF-8",
            Data: `
            ${body.name}様から以下、お問い合わせがありました。

            この度は【岡田茂之ポートフォリオサイト】からのお問い合わせありがとうございます。
            内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。
            3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。

            ===================================

            お名前：${body.name}
            メールアドレス：${body.email}
            内容
            ${body.content}

            ===================================
            
            ○●-----------------------●○

            Webエンジニア
            岡田　茂之
            okada shigeyuki

            info_os-create@os-create.com

            ○●-----------------------●○
            `,
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: "【os-create】お問い合わせありがとうございます。",
        },
        },
        Source: fromAddress
    });
};

router.post("/send", async (req, res) => {
    const sendUserEmailCommand = createSendEmailCommand(req.body.email, "info_os-create@os-create.com", req.body);
    const sendAdminEmailCommand = createAdminEmailCommand("info_os-create@os-create.com", "info_os-create@os-create.com", req.body);
    try {
    await ses.send(sendUserEmailCommand);
    await ses.send(sendAdminEmailCommand);
    const newEmail = new Email(req.body);
    const email = await newEmail.save();
    return res.status(200).json(email);

    } catch (error) {
    return res.status(200).json(error);
    }
});

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();
// sgMail.setApiKey(process.env.SEND_API_KEY);

// const userSendMail = (email, name, content) => {

//     const message = {
//         from: {
//             name: "差出人",
//             email: process.env.EMAIL_FROM
//         },
//         to: {
//             name: "宛先",
//             email: email
//         },
//         subject: "お問い合わせありがとうございます。",
//         text: [
//             `${name}様`,
//             "",
//             "内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。",
//             "3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。",
//             "",
//             "===================================",
//             "",
//             `お名前：${name}`,
//             `メールアドレス：${email}`,
//             `内容`,
//             content,
//             "",
//             "===================================",
//             "",
//             "○●-----------------------●○",
//             "",
//             "Webエンジニア",
//             "岡田　茂之",
//             "okada shigeyuki",
//             "",
//             "info_os-create@os-create.com",
//             "",
//             "○●-----------------------●○",
//         ].join("\n"),
//     }

//     return message;
// }

// const adminSendMail = (email, name, content) => {

//     const message = {
//         from: {
//             name: "差出人",
//             email: process.env.EMAIL_FROM
//         },
//         to: {
//             name: "宛先",
//             email: process.env.EMAIL_TO_QQA
//         },
//         subject: "os-createからお問い合わせがありました。",
//         text: [
//             `${name}様から以下お問い合わせがありました。`,
//             "",
//             "内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。",
//             "3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。",
//             "",
//             "===================================",
//             "",
//             `お名前：${name}`,
//             `メールアドレス：${email}`,
//             `内容`,
//             content,
//             "",
//             "===================================",
//             "",
//             "○●--------------------------------●○",
//             "",
//             "Webエンジニア",
//             "岡田　茂之",
//             "okada shigeyuki",
//             "",
//             "info_os-create@os-create.com",
//             "",
//             "○●--------------------------------●○",
//         ].join("\n"),
//     }

//     return message;
// }

// router.post("/send", async (req, res) => {
//     const newEmail = new Email(req.body);
//     const userMessage = userSendMail(req.body.email, req.body.name, req.body.content);
//     const adminMessage = adminSendMail(req.body.email, req.body.name, req.body.content);
//     try {
//         const email = await newEmail.save();
//         try {
//             await sgMail.send(userMessage);
//             await sgMail.send(adminMessage);
//         } catch (error) {
//             console.error('Error sending email:', error);
//             if (error.response) {
//                 console.error(error.response.body)
//             }
//             return res.status(500).json({error: 'Failed to send email.'});
//         }
//         return res.status(200).json(email);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// });

module.exports = router;