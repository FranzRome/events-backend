import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../email/email.service';


@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private readonly emailService: EmailService,
      private readonly configService: ConfigService,
   ) { }

   async create(createUserDto: CreateUserDto): Promise<User> {
      const saltRounds: number = Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS'));
      console.log(typeof saltRounds);
      const salt: any = this.configService.get<any>('BCRYPT_SALT');
      const password: string = createUserDto.password;
      const hashedPassword = await bcrypt.hash(
         password,
         bcrypt.genSaltSync(saltRounds)
      );
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Check duplicate email
      const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
      if (existingUser)
         throw new ConflictException('Email already in use');

      const createdUser = new this.userModel({
         ...createUserDto,
         password: hashedPassword,
         verificationToken,
         isVerified: false,
      });
      await this.emailService.sendVerificationEmail(createUserDto.email, verificationToken);
      return createdUser.save();
   }

   async verifyUser(token: string): Promise<User | undefined> {
      const user = await this.userModel.findOne({ verificationToken: token }).exec();
      if (user) {
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
      }
      return user;
    }

   async findUser(username: string): Promise<User | undefined> {
      return this.userModel.findOne({ username }).exec();
   }
}