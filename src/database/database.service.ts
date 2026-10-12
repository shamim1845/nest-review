import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected = false;

    onModuleInit() {
        this.connect();
    }

    onApplicationShutdown(signal: string) {
        this.disconnect(signal);
    }

    getStatus() {
        return {
            message: this.isConnected ? "Connected" : "Disconnected",
        }
    }


    // Utilites
    connect() {
        this.isConnected = true;
        console.log('Database connected');
    }

    disconnect(signal?: string) {
        this.isConnected = false;
        console.log(`Database disconnected. Signal - ${signal}`);
    }
}
