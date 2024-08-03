import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

   async create(createUserDto: CreateUserDto): Promise<User> {
      // Check duplicate email
      const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
      if (existingUser)
         throw new ConflictException('Email already in use');

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
      return createdUser.save();
   }

   async findUser(username: string): Promise<User | undefined> {
      return this.userModel.findOne({ username }).exec();
   }
}