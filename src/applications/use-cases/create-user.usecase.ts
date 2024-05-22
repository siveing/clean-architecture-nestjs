import { UserM } from 'src/domains/model/user';
import { UserRepository } from 'src/domains/repositories/user.repository';
import { CreateUserDto } from 'src/presentations/user/dto/create-user.dto';

export class CreateUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(user: CreateUserDto): Promise<UserM> {
    return await this.usersRepository.createUser(user);
  }
}