import { Injectable, Logger, NestMiddleware, Req } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestMiddleware.name);

  use(@Req() req: Request, res: Response, next: NextFunction) {
    this.logger.debug(req.originalUrl);
    next();
  }
}
