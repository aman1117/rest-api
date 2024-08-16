import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            hour12: false,
            timeZone: 'UTC'
        }).format(new Date())}\t${entry}\n`;
        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'app.log'), formattedEntry);
        } catch (e) {
            // NU instanceof Error
            if (e instanceof Error) {
                this.error(e.message, e.stack);
            }
        }

    }
    log(message: any, context?: string) {
        const entry = `${new Date().toISOString()} - [${context}] ${message}`;
        this.logToFile(entry);
        super.log(entry);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${new Date().toISOString()} - [${stackOrContext}]\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
