import { Injectable, NestMiddleware } from '@nestjs/common';


const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

//const resolvePath = (file: string) => path.resolve(`../dist/${file}`);

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
