## Codehaus Nodemailer

<img width="400" src="https://i.ibb.co/jrgM0LQ/logo-vetorizada-final-colors.png" alt="logo-vetorizada-final-colors" border="0">

[![NPM](https://nodei.co/npm/codehaus-nodemailer.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/codehaus-nodemailer/)


### Description
Send e-mails from Nest.js (Node.js) using `handlebars` and `nodemailer`.


### Features
 - Send Email
 - Render HTML Template
 - Pass DATA to HTML


Import `CodehausEmailModule` in your module:

```typescript
import { Module } from '@nestjs/common';
import { CodehausEmailModule } from 'codehaus-nodemailer';

@Module({
  imports: [
    CodehausEmailModule.register({
      pool: true,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      }
    }),
  ],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule { }

```
Params:
- `port` – is the port to connect to (defaults to 587 if is secure is false or 465 if true)
- `host` – is the hostname or IP address to connect to (defaults to ‘localhost’)
- `auth` – defines authentication data (see authentication section below)
- `secure` – if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
- `pool` – see Pooled SMTP for details about connection pooling

Module Params:

```typescript

interface {
    pool: boolean;
    host: string;
    port: number;
    secure: boolean; // use TLS
    auth: {
        user: string;
        pass: string;
    }
}

```

Service:

```typescript
import { CodehausEmailService } from 'codehaus-nodemailer';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MyService {
    constructor(
        private codehausEmailService: CodehausEmailService,
    ) { }

    public async sendEmail(params?): Promise<any> {
        await this.codehausEmailService.send({
            from: 'myEmail@codehaus.com.br',
            to: 'destineEmail@codehaus.com.br',
            templatePath: 'src/templates/template.html', // RELATIVE path only
            subject: 'My subject',
            data: {
                username: 'Mike'
            }
        });
    }
}

```

SendEmail Params:

```typescript

interface EmailSender {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    templatePath?: string;
    data?: any;
}

```

`src/templates/template.html`
HTML:

```html
<div>Hello {{ username }}</div>
```