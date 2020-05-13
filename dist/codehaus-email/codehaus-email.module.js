"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodehausEmailModule = void 0;
const common_1 = require("@nestjs/common");
const codehaus_email_service_1 = require("./codehaus-email.service");
const inject_service_1 = require("./lib/inject.service");
let CodehausEmailModule = /** @class */ (() => {
    var CodehausEmailModule_1;
    let CodehausEmailModule = CodehausEmailModule_1 = class CodehausEmailModule {
        static register(options) {
            return {
                module: CodehausEmailModule_1,
                providers: [
                    {
                        provide: 'EMAIL_OPTIONS',
                        useValue: options,
                    },
                    inject_service_1.InjectService,
                    codehaus_email_service_1.CodehausEmailService,
                ],
                exports: [
                    codehaus_email_service_1.CodehausEmailService,
                ],
            };
        }
    };
    CodehausEmailModule = CodehausEmailModule_1 = __decorate([
        common_1.Module({
            providers: [codehaus_email_service_1.CodehausEmailService, inject_service_1.InjectService]
        })
    ], CodehausEmailModule);
    return CodehausEmailModule;
})();
exports.CodehausEmailModule = CodehausEmailModule;
//# sourceMappingURL=codehaus-email.module.js.map