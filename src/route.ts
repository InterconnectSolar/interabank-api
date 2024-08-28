import express, { Request, Response } from 'express';
import * as brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

const routes = express.Router();

routes.post("/email", async (req: Request, res: Response) => {
    try {

        const { email, name, senderName, value, message } = req.body;

        if(!email || !name || !senderName || !value || !message){
            res.send({error: "invalid request"})
        }

        const apiInstance = new brevo.TransactionalEmailsApi();

        apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            process.env.BREVO_API_KEY as string
        );

        const smtpEmail = new brevo.SendSmtpEmail();

        smtpEmail.subject = "TRANSFERÊNCIA RECEBIDA";
        smtpEmail.to = [
            { email, name },
        ];
        smtpEmail.htmlContent = `
          <!DOCTYPE html>
          <html lang="pt-BR">
              <head>
                  <meta charset="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Você Recebeu Interas</title>
              </head>
              <body
                  style="
                  font-family: Arial, sans-serif;
                  background-color: #333333;
                  color: white;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
                  width: 100%;
                  height: 100%;
                  "
              >
                  <!-- Container principal -->
              <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              align="center"
              style="border-collapse: collapse; table-layout: fixed; width: 100%; min-width: 100%;"
              >
                  <tr>
                      <td align="center" valign="top">
                      <!-- Tabela interna para o conteúdo -->
                      <table
                          role="presentation"
                          width="350"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="
                          background-color: #2b2b2b;
                          border-radius: 10px;
                          text-align: center;
                          padding: 0;
                          "
                      >
                          <tr>
                          <td
                              style="
                              background-color: #4cd3c2;
                              color: white;
                              font-size: 18px;
                              padding: 10px;
                              border-radius: 10px 10px 0 0;
                              text-align: center;
                              "
                          >
                              VOCÊ RECEBEU INTERAS
                          </td>
                          </tr>
                          <tr>
                          <td
                              style="
                              padding: 20px;
                              font-size: 16px;
                              color: white;
                              text-align: left;
                              "
                          >
                              Olá, ${name}<br />
                              ${senderName} acaba de te enviar ${value > 1 ? (value + " interas") : (value + " intera")}<br />
                              com a seguinte mensagem: ${message}.
                          </td>
                          </tr>
                          <tr>
                          <td style="padding: 20px;">
                              <table
                              role="presentation"
                              width="80%"
                              align="center"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              style="
                                  background-color: transparent;
                                  border: 1px solid #4cd3c2;
                                  margin: 20px auto;
                                  padding: 20px;
                                  border-radius: 8px;
                                  text-align: center;
                              "
                              >
                              <tr>
                                  <td style="font-size: 32px; font-weight: bold; color: white;">
                                  I$ ${value}
                                  </td>
                              </tr>
                              <tr>
                                  <td
                                  style="
                                      font-size: 14px;
                                      margin-top: 10px;
                                      color: white;
                                  "
                                  >
                                  ${senderName}
                                  </td>
                              </tr>
                              <tr>
                                  <td
                                  style="
                                      font-size: 14px;
                                      margin-top: 10px;
                                      color: white;
                                  "
                                  >
                                  ${message}
                                  </td>
                              </tr>
                              </table>
                          </td>
                          </tr>
                      </table>
                      </td>
                  </tr>
                  </table>
              </body>
          </html>
  
          `;
        smtpEmail.sender = {
            name: "Contato Interabank",
            email: "interconnectce@gmail.com",
        };

        await apiInstance.sendTransacEmail(smtpEmail);

        res.send("Email enviado com sucesso!");
    } catch (err) {
        console.log(err);
        return res.send("erro: " + err);
    }
});

export default routes;