export interface EmailSender {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    templatePath?: string;
    data?: any;
}
//# sourceMappingURL=email-sender.d.ts.map