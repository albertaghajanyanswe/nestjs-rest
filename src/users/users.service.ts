import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const saltOrRounds = 10;
    console.log('\n\n AAAAAAA 1 ', dto);

    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
    console.log('\n\n AAAAAAA 2 ', { ...dto, password: hashedPassword })
    const user = await this.userRepository.create({ ...dto, password: hashedPassword });
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    delete user.dataValues.password;
    console.log('user = 0 ', user)
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUser(query: object): Promise<User> {
    return this.userRepository.findOne(query);
  }
}
