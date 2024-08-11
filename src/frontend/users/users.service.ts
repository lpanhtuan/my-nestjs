import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseError, ResponseSuccess } from 'src/common/response/Response';
import { Paging } from 'src/common/paging/Paging';
import { MysqlErrorCode } from 'src/database/mysqlErrorCodes.enum';
import * as bcrypt from 'bcrypt'



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.userRepository.create(createUserDto)
      await this.userRepository.save(data)
      return new ResponseSuccess(data)
    } catch (error) {
      if (error?.code === MysqlErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }

  async findAll() {
    const data = await this.userRepository.find()
    return new ResponseSuccess(data)
  }

  async getListUser() {
    const data = await this.userRepository.findAndCount()
    const paging = new Paging(1, 10, 1, data[1])
    return new ResponseSuccess(data[0], paging)


  }

  async findOne(id: number) {
    try {
      const data = await this.userRepository.findOne({
        where: { id }
      })
      if (data == null) {
        return data
      }
      return data
    } catch (error) {
      if (error.code == MysqlErrorCode.UniqueViolation) {
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      }
    }
  }

  async findByEmail(email: string) {
    const data = await this.userRepository.findOne({
      where: {
        email
      }
    })
    if (data) {
      return data
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async saveAvatarWithId(path: string, id: number) {
    if (Number.isNaN(id)) {
      throw new HttpException('id must a number', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userRepository.findOne({ where: { id } });
    const rs = await this.userRepository.update(id, {
      ...user,
      avatar: path
    })
    return new ResponseSuccess(rs)

  }
  async findAllPostByIdUser(id: number) {
    const data = this.userRepository.findOne({
      where: {
        id
      },
      relations: ['posts']
    })
    if (data) {
      return data
    }
    throw new HttpException('not found posts by id', HttpStatus.NOT_FOUND);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    })
    if (user.currentHashedRefreshToken == null) {
      return new ResponseError('chưa đăng nhập')
    }

    const isRefreshTokenMatching = await bcrypt.compareSync(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    } else {

      return 'dont match jwt-refresh'
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null
    });
  }
}
