import { Module, DynamicModule } from "@nestjs/common";
import { raw } from "express";
import { GetAllUserUseCases } from "src/applications/use-cases/user.usecase";
import { EnvironmentConfigModule } from "../config/environment-config/environment-config.module";
import { RepositoriesModule } from "../repositories/repository.module";
import { UserRepositoryOrm } from "../repositories/user.repository";
import { UseCaseProxy } from "./usecase-proxy";
import { CreateUserUseCases } from "src/applications/use-cases/create-user.usecase";

@Module({
    imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecaseProxyModule {
    static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
    static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

    static register(): DynamicModule {
        return {
            module: UsecaseProxyModule,
            providers: [
                {
                    inject: [UserRepositoryOrm],
                    provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
                    useFactory: (userRepository: UserRepositoryOrm) =>
                        new UseCaseProxy(new GetAllUserUseCases(userRepository)),
                },
                {
                    inject: [UserRepositoryOrm],
                    provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
                    useFactory: (userRepository: UserRepositoryOrm) =>
                        new UseCaseProxy(new CreateUserUseCases(userRepository)),
                },
            ],
            exports: [UsecaseProxyModule.GET_ALL_USERS_USE_CASE, UsecaseProxyModule.CREATE_USER_USE_CASE],
        };
    }
}