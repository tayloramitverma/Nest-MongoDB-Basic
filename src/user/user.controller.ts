import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CustomGuard } from 'src/guards';

@Controller('user')
export class UserController {
  @Get()
  getUser(): string {
    return 'Hello Users';
  }

  @Get('history')
  @UseGuards(CustomGuard)
  getHistrory(): object {
    return { id: 2, name: 'AMit' };
  }

  @Get('info/:id')
  getInfo(@Param('id', ParseIntPipe) id: number): object {
    if (id == 12) {
      //throw new HttpException('Some Error', HttpStatus.BAD_REQUEST);

      throw new ForbiddenException();
    }
    return {
      id: id,
      data: 'N/A',
    };
  }
}
