import { Body, Controller, Get, HttpCode, Post, Req, Response, SerializeOptions, UseGuards } from '@nestjs/common';
import { Response as Res } from 'express';
import { AuthenticationService } from './authentication.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { CreateUserDto } from 'src/frontend/users/dto/create-user.dto';
import { UsersService } from 'src/frontend/users/users.service';
import JwtRefreshGuard from './jwt-refresh.guard';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UsersService
  ) { }

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }


  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;

    // const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    // user.password = undefined;
    // return response.send(user);

    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, user.id);

    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    return user;
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Post('log-out')
  // async logOut(@Req() request: RequestWithUser, @Response() response: Res) {
  //   response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
  //   return response.sendStatus(200);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookiesForLogOut());
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return { user, token: request.cookies };
  }
}
