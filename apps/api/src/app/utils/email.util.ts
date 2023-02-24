import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailtrapClient } from 'mailtrap'


const configService: ConfigService =  new ConfigService()

export async function sendConfirmationEmail(recipientEmail: string, confirmationCode: number){
  const TOKEN = configService.get<string>('MAILTRAP_API_TOKEN') as string
  const senderEmail = configService.get<string>('SENDER_EMAIL') as string
   const client = new MailtrapClient({token: TOKEN})
   const sender = {name: 'Yimcipe HR', email: senderEmail}
   await client.send({
    from: sender,
    to: [{email: recipientEmail}],
    subject: 'Email Verification Code',
    html: `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Thank you for choosing to create an account with us.</h1>
          <p>Attached to this message is a confirmation code for your email which expires in 30 minutes after which, it will be revoked</p>
          <p>In that case, you will have to go throught the registration stage from scratch</p>
          <h1>Confirmation Code: <strong>${confirmationCode}</strong></h1>
          <p>Good luck! Hope it works.</p>
        </div>
      </body>
    </html>
    `
   }).then(result => {
    console.log({payload: result})
    Logger.log(result)
   })
   .catch((error) => {
    console.log({Error: error.errors})
    Logger.error(error)
   })
}

