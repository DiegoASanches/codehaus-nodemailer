#### Codehaus Nodemailer

<img style="width: 200px" src="https://i.ibb.co/jrgM0LQ/logo-vetorizada-final-colors.png" alt="logo-vetorizada-final-colors" border="0">

[![NPM](https://nodei.co/npm/codehaus-nodemailer.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/codehaus-nodemailer/)


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
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    }),
  ],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule { }

```



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
            templatePath: 'src/templates/template.html',
            subject: 'My subject',
            data: {
                username: 'Diego'
            }
        });
    }
}

```


`src/templates/template.html`

```html
    <div>Hello {{ username }}</div>
```