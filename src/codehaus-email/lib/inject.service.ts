import { Injectable, Inject, Optional } from "@nestjs/common";
import { EmailConfig } from "./model/email-config";

@Injectable()
export class InjectService {

    config: EmailConfig;
    constructor(@Optional() @Inject('EMAIL_OPTIONS') private options: EmailConfig) {
        this.config = options;
    }

}
