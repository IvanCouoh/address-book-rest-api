import { BadRequestException, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthGuard)
  @Get()
  getHello(@Req() request: Request): string {
    const authorization = request.headers['authorization'];
    if (authorization) {
      return this.appService.getHello();
    } else {
      throw new BadRequestException('Bad request, you need authorization')
    }
  }
}
