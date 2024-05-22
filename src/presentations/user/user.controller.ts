import { Controller, Inject, Get, Body, Post } from "@nestjs/common";
import { GetAllUserUseCases } from "src/applications/use-cases/user.usecase";
import { UseCaseProxy } from "src/infrastructures/usecase-proxy/usecase-proxy";
import { UsecaseProxyModule } from "src/infrastructures/usecase-proxy/usecase-proxy.module";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserUseCases } from "src/applications/use-cases/create-user.usecase";

@Controller('users')
export class UserController {
    constructor(
        @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
        private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCases>,
        @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
        private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCases>,
    ) { }

    @Get('')
    async getAllUsers() {
        const result = await this.getUserUsecaseProxy.getInstance().execute();
        return {
            status: 'OK',
            code: 200,
            message: 'Get data success',
            data: result,
        };
    }

    @Post('')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const { email, name, password } = createUserDto;
        const result = await this.createUserUsecaseProxy.getInstance().execute({
            email,
            name,
            password,
        });
        return {
            status: 'Created',
            code: 201,
            message: 'Insert data success',
            data: result,
        };
    }
}