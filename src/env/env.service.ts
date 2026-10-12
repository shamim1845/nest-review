import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
    constructor(private readonly configService: ConfigService) { }
    
    getEnv() {
        return this.configService.get<string>('ENV');
    }

    getPort() {
        return this.configService.get<number>('PORT');
    }

    getEnvDatabaseUrl() {
        return this.configService.get<string>('MONGO_DATABASE_URL');
    }

    getEnvJwtSecret() {
        return this.configService.get<string>('JWT_SECRET');
    }
}
