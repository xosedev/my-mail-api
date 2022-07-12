import { Mail } from '../model/mail.interface'
import { GenericResponse } from '../interfaces/response.interface'
import nodemailer from "nodemailer";

class MailService {

  async sendMail(
    mail: Mail
  ): Promise<GenericResponse> {
    const genericResponse: GenericResponse = {}

    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS

    try {

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user,
          pass: pass,
        },
        logger: true
      });

      const info = await transporter.sendMail({
        from: `" ${mail.userName}" ${user}`,
        to: user,
        subject: mail.subject,
        text: mail.text
      });
  
      genericResponse.data = info
    } catch (error) {
      genericResponse.error = {
        message: error.message,
        status: '500',
        system: 'ERROR SEND MAIL'
      }
    }
    return genericResponse
  }
}

const mailService = new MailService()
export default mailService
