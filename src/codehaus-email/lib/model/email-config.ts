export interface EmailConfig {
    pool: boolean;
    host: string;
    port: number;
    secure: boolean; // use TLS
    auth: {
        user: string;
        pass: string;
    }
}
