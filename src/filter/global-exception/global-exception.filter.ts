import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // No argument → catches ALL exceptions (not just HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      // ── 1) HttpException we threw intentionally (NotFoundException, etc.)
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message ?? res;
    } else if (this.isMongooseError(exception)) {
      // ── 2) Mongoose / MongoDB errors
      const result = this.handleMongooseError(exception);
      status = result.status;
      message = result.message;
    } else {
      // ── 3) Truly unexpected — don't leak internals
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    // Log the full error for debugging (never sent to the client)
    this.logger.error(
      `${request.method} ${request.url} → ${status}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  // ────────────────────────────────────────────────────────────────
  private isMongooseError(err: any): boolean {
    return (
      err?.name === 'CastError' ||
      err?.name === 'ValidationError' ||
      err?.code === 11000
    );
  }

  private handleMongooseError(err: any): { status: number; message: string } {
    // Invalid ObjectId
    if (err.name === 'CastError') {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Invalid ID format: "${err.value}"`,
      };
    }

    // Mongoose schema validation
    if (err.name === 'ValidationError') {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: err.message,
      };
    }

    // Duplicate key (unique index violation)
    if (err.code === 11000) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Duplicate value: ${JSON.stringify(err.keyValue)}`,
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }
}
