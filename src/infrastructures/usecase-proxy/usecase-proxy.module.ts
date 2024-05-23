import { DynamicModule, Module } from "@nestjs/common";
import { LoginUseCases } from "src/applications/use-cases/auth/login.usecase";
import { CreateUserUseCases } from "src/applications/use-cases/create-user.usecase";
import { GetAllUserUseCases } from "src/applications/use-cases/user.usecase";
import { EnvironmentConfigModule } from "../config/environment-config/environment-config.module";
import { LogModule } from "../log/log.module";
import { LogService } from "../log/log.service";
import { RepositoriesModule } from "../repositories/repository.module";
import { UserRepositoryOrm } from "../repositories/user.repository";
import { UseCaseProxy } from "./usecase-proxy";

@Module({
    imports: [
        EnvironmentConfigModule,
        LogModule,
        RepositoriesModule
    ],
})
export class UsecaseProxyModule {
    // !!! AUTHENTICATE
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';

    // !!! USER
    static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
    static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

    static register(): DynamicModule {
        return {
            module: UsecaseProxyModule,
            providers: [
                {
                    inject: [LogService, UserRepositoryOrm],
                    provide: UsecaseProxyModule.LOGIN_USECASES_PROXY,
                    useFactory: (
                        logger: LogService,
                        userRepository: UserRepositoryOrm,
                    ) => new UseCaseProxy(new LoginUseCases(logger, userRepository)),
                },
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
            exports: [
                UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
                UsecaseProxyModule.CREATE_USER_USE_CASE,
                UsecaseProxyModule.LOGIN_USECASES_PROXY
            ],
        };
    }
}