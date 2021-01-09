/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const csrfProtection = csurf({
    cookie: true,
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  });

  app.use(csrfProtection, (req, res, next): void => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    next();
  });

  app.use(function (err, req: Request, res: Response, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    console.log('XSRF Error', req.cookies);
    // handle CSRF token errors here
    res.status(403);
    res.send('XSRF Error');
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
