import { Injectable } from '@nestjs/common';
import { InjectService } from './lib/inject.service';
import { EmailConfig } from './lib/model/email-config';
import { EmailSender } from './lib/model/email-sender';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class CodehausEmailService {

    config: EmailConfig;

    constructor(
        private injectService: InjectService,
    ) {
        this.config = this.injectService.config;
    }

    async send(options: EmailSender) {
        const templatePath = options && options.templatePath ? options.templatePath : null;
        const data = options && options.data ? options.data : null;
        const transporter = nodemailer.createTransport(this.config);

        if (templatePath) {
            return await this.renderTemplate(options, templatePath, data, (err, opt) => {
                console.error('Email Error', err);
                return transporter.sendMail(opt);
            });
        } else {
            if (options && options.html) {
                options.html = this.patchValueToEmail(options.html, data);
            }
            return await transporter.sendMail(options);
        }
    }

    renderTemplate(mailOptions, path, data, masterCallBack) {
        const readHTMLFile = (pathItem, callback) => {
            fs.readFile(pathItem, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, html);
                }
            });
        };

        readHTMLFile(path, (err, html) => {
            if (err) { masterCallBack(err); }
            mailOptions.html = this.patchValueToEmail(html, data);
            return masterCallBack(null, mailOptions);
        });
    }

    patchValueToEmail(html, data) {
        const template = handlebars.compile(html);
        const replacements = data;
        const htmlToSend = template(replacements);
        return htmlToSend;
    }
}
