import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user.id);
  }

  deserializeUser(userId: string, done: CallableFunction) {
    this.usersService.findUser(userId).then((user) => {
      done(null, user);
    }).catch((error) => done(error));
  }
}
