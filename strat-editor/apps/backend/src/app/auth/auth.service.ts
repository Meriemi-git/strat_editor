import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(mail: string, hash: string): Promise<any> {
    const user = await this.usersService.findOne(mail);
    if (user && user.password === hash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
