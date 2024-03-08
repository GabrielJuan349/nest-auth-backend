import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';

import {CreateUserDto, UpdateAuthDto, LoginDto,RegisterDto} from './dto'
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    try{
      console.log(createUserDto);
      const {password, ...userData} = createUserDto;

      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });
     
      await newUser.save();
      const {password:_, ...user} = newUser.toJSON();

      return user;

    } catch(err){
      if(err.code === 11000){
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something terrible happen!!!');
    }
  }

  async register(registerDto:RegisterDto):Promise<LoginResponse> {
    
    const regUser:User = await this.create(registerDto);
    console.log(regUser);
    return {
      user: regUser,
      token: this.getJwtToken({id: regUser._id}),
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const {email, password} = loginDto;
    const user = await this.userModel.findOne({ email });
    if(!user){
      throw new UnauthorizedException('Invalid credentials: User');
    }

    if(!bcrypt.compareSync(password, user!.password)){
      throw new UnauthorizedException('Invalid credentials: Password');
    }

    const {password:_, ...rest} = user.toJSON();

    return {
      user: rest,
      token: await this.getJwtToken({id: user.id}),
    } ;

  }

  getJwtToken(payload: JwtPayload){
    return this.jwtService.sign(payload);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }
  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
