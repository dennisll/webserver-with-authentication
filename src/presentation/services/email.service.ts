import nodemailer, { Transporter } from 'nodemailer';
import { envs } from '../../config';



export interface SendEmailOptions{
 to: string | string[];
 subject: string;
 htmlBody: string;
 attachements?: Attachements []
}

export interface Attachements{
 fileName: string;
 path: string;
}

export class EmailService{

    private transporter: Transporter;

    constructor(
        private readonly mailerService: string,
        private readonly mailerEmail: string,
        private readonly senderEmailPassword: string,
        private readonly postToProvider: boolean
    ){


        this.transporter = nodemailer.createTransport({
            service: this.mailerService,
            auth: {
                user: this.mailerEmail,
                pass: this.senderEmailPassword
            },
            tls:{
                rejectUnauthorized: false
            }
        });

    }
    
    async sendEmail( options: SendEmailOptions): Promise<boolean>{

        const {to, subject, htmlBody, attachements=[]} = options;

        try {

            if(!this.postToProvider) return true;

            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
                attachments: attachements
            });

            return true;

        } catch (error) {

           return false; 
        }
    }
}