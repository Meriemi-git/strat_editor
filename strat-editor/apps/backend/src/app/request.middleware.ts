import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: NextFunction) {
    next();
  }
}
