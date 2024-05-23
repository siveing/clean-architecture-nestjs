import { Module } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmModule } from "@nestjs/typeorm";
import { EnvironmentConfigModule } from "../environment-config/environment-config.module";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";

export const getTypeOrmModuleOptions = (
    config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
    return ({
        type: 'mysql',
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: "",
        database: config.getDatabaseName(),
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
            migrationsDir: 'src/migrations',
        },
    } as TypeOrmModuleOptions);
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})
export class TypeOrmConfigModule { }