import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './applications/guard/auth.guard';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { LogModule } from './infrastructures/log/log.module';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { UserModule } from './presentations/user/user.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LogModule,
    UsecaseProxyModule.register(),
    UserModule,
  ],
  controllers: [],
  providers: [
    AuthGuard
  ],
})
export class AppModule { }
