import { CreateUserDto } from "src/presentations/user/dto/create-user.dto";
import { UserM } from "../model/user";

export interface UserRepository {
    getAllUsers(): Promise<UserM[]>;
    createUser(user: CreateUserDto): Promise<UserM>;
    getUserByUsername(username: string): Promise<UserM>;
    updateLastLogin(username: string): Promise<void>;
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}