///// LoginUseCases

import { UserRepository } from 'src/domains/repositories/user.repository';
import { LogService } from 'src/infrastructures/log/log.service';

export class LoginUseCases {
    constructor(
        private readonly logger: LogService,
        private readonly userRepository: UserRepository
    ) { }

    async updateLoginTime(username: string) {
        this.logger.debug("LoginUseCases", `[LoginUseCases] updateLoginTime: ${username}`);
        await this.userRepository.updateLastLogin(username);
    }
}