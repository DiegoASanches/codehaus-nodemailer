import { Module, DynamicModule } from '@nestjs/common';
import { CodehausEmailService } from './codehaus-email.service';
import { InjectService } from './lib/inject.service';
import { EmailConfig } from './lib/model/email-config';

@Module({
  providers: [CodehausEmailService, InjectService]
})
export class CodehausEmailModule {
  static register(options: EmailConfig): DynamicModule {
    return {
      module: CodehausEmailModule,
      providers: [
        {
          provide: 'EMAIL_OPTIONS',
          useValue: options,
        },
        InjectService,
        CodehausEmailService,
      ],
      exports: [
        CodehausEmailService,
      ],
    };
  }
}
