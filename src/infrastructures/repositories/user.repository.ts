import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserM } from "src/domains/model/user";
import { UserRepository } from "src/domains/repositories/user.repository";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "src/presentations/user/dto/create-user.dto";

@Injectable()
export class UserRepositoryOrm implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getAllUsers(): Promise<UserM[]> {
        const users = await this.userRepository.find();
        return users.map((user) => this.toUser(user));
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserM> {
        try {
            const user = new User();
            user.email = createUserDto.email;
            user.name = createUserDto.name;
            user.password = createUserDto.password;
            const result = await this.userRepository.save(user);
            return result
        } catch (error: any) {
            throw new BadRequestException(error.sqlMessage);
        }
    }

    private toUser(userEntity: User): UserM {
        const user: UserM = new UserM();

        user.id = userEntity.id;
        user.email = userEntity.email;
        user.name = userEntity.name;
        user.password = userEntity.password;
        user.created_at = userEntity.created_at;
        user.updated_at = userEntity.updated_at;

        return user;
    }
}