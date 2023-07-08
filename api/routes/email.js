const router = require("express").Router();
const Email = require("../models/Email");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
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
            岡田 茂之
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
    Source: fromAddress,
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
            岡田 茂之
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
    Source: fromAddress,
  });
};

router.post("/send", async (req, res) => {
  const sendUserEmailCommand = createSendEmailCommand(
    req.body.email,
    process.env.EMAIL_FROM,
    req.body,
  );
  const sendAdminEmailCommand = createAdminEmailCommand(
    process.env.EMAIL_FROM,
    process.env.EMAIL_FROM,
    req.body,
  );
  try {
    await ses.send(sendUserEmailCommand);
    await ses.send(sendAdminEmailCommand);
    const newEmail = new Email(req.body);
    await newEmail.save();
    return res.status(200).json("メールを送信しました。");
  } catch (error) {
    return res.status(200).json(error);
  }
});

module.exports = router;
