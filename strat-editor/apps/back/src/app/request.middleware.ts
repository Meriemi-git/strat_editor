import { Injectable, NestMiddleware } from '@nestjs/common';


@Injectable()
export class RequestMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
