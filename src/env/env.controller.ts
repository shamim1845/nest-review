import { Controller, Get } from '@nestjs/common';
import { EnvService } from './env.service';

@Controller('env')
export class EnvController {
  constructor(private readonly envService: EnvService) {}

  @Get()
  getEnv() {
    return this.envService.getEnv();
  }

  @Get('port')
  getPort() {
    return this.envService.getPort();
  }

  @Get('database-url')
  getEnvDatabaseUrl() {
    return this.envService.getEnvDatabaseUrl();
  }

  @Get('jwt-secret')
  getEnvJwtSecret() {
    return this.envService.getEnvJwtSecret();
  }
}
