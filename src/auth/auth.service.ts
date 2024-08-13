import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (!user) {
      console.log('User not found');
      return null;
    }


    Logger.log(user.isVerified)

    if (!user.isVerified) {
      console.log('User email is not verified');
      // Lancia un'eccezione per fermare il processo di login
      throw new UnauthorizedException('Please verify your email to login.');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null;
    }

    console.log(`${user.username} authenticated successfully`);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload.username
    };
  }
}
