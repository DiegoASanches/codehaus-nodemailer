"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodehausEmailService = void 0;
const common_1 = require("@nestjs/common");
const inject_service_1 = require("./lib/inject.service");
const nodemailer = __importStar(require("nodemailer"));
const handlebars = __importStar(require("handlebars"));
const fs = __importStar(require("fs"));
let CodehausEmailService = /** @class */ (() => {
    let CodehausEmailService = class CodehausEmailService {
        constructor(injectService) {
            this.injectService = injectService;
            this.config = this.injectService.config;
        }
        async send(options) {
            const templatePath = options && options.templatePath ? options.templatePath : null;
            const data = options && options.data ? options.data : null;
            const transporter = nodemailer.createTransport(this.config);
            if (templatePath) {
                return await this.renderTemplate(options, templatePath, data, (err, opt) => {
                    return transporter.sendMail(opt);
                });
            }
            else {
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
                    }
                    else {
                        callback(null, html);
                    }
                });
            };
            readHTMLFile(path, (err, html) => {
                if (err) {
                    masterCallBack(err);
                }
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
    };
    CodehausEmailService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [inject_service_1.InjectService])
    ], CodehausEmailService);
    return CodehausEmailService;
})();
exports.CodehausEmailService = CodehausEmailService;
//# sourceMappingURL=codehaus-email.service.js.map