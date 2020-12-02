import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`Request ${req.originalUrl}`);
    next();
  }
}
