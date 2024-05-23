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

            // !!! USERNAME
            const username = await this.generateUsername(createUserDto.name);
            user.username = username;

            const result = await this.userRepository.save(user);
            return result;
        } catch (error: any) {
            throw new BadRequestException(error.sqlMessage);
        }
    }

    async getUserByUsername(username: string): Promise<UserM> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        return this.toUser(user);
    }

    async updateLastLogin(username: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        user.lastLogin = new Date();
        await this.userRepository.save(user);
    }

    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
    }

    private async generateUsername(name: string) : Promise<string>{
        let lowerCaseUsername = name.replace(' ', '').toLowerCase();
        const user = await this.userRepository.findOne({ where: { username: lowerCaseUsername } });
        if (user) {
            lowerCaseUsername = `${lowerCaseUsername}-${new Date().getTime()}`
        }
        return lowerCaseUsername;
    }

    private toUser(userEntity: User): UserM {
        const user: UserM = new UserM();

        user.id = userEntity.id;
        user.email = userEntity.email;
        user.username = userEntity.username;
        user.name = userEntity.name;
        user.password = userEntity.password;
        user.lastLogin = userEntity.lastLogin;
        user.createdAt = userEntity.createdAt;
        user.updatedAt = userEntity.updatedAt;

        return user;
    }
}