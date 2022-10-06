import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMe(): string {
    return 'Ignacio Prado';
  }
}
