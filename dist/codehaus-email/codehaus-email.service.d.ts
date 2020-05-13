import { InjectService } from './lib/inject.service';
import { EmailConfig } from './lib/model/email-config';
import { EmailSender } from './lib/model/email-sender';
export declare class CodehausEmailService {
    private injectService;
    config: EmailConfig;
    constructor(injectService: InjectService);
    send(options: EmailSender): Promise<any>;
    renderTemplate(mailOptions: any, path: any, data: any, masterCallBack: any): void;
    patchValueToEmail(html: any, data: any): string;
}
//# sourceMappingURL=codehaus-email.service.d.ts.map