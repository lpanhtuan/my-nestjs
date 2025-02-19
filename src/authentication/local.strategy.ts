
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Controller, Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import User from 'src/entities/user.entity';

@Injectable()
@Controller('local')
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthenticationService) {
        super({
            usernameField: 'email'
        });
    }
    async validate(email: string, password: string): Promise<User> {
        return this.authenticationService.getAuthenticatedUser(email, password);
    }
}