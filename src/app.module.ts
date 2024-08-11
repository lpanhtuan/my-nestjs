import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { AuthenticationModule } from './authentication/authentication.module'
import { BackendModule } from './backend/backend.module'
import { DatabaseModule } from './database/database.module'
import { FrontendModule } from './frontend/frontend.module'
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter'
import { TransformationInterceptor } from './utils/interceptor-response/transform.interceptor'




@Module({
  imports: [
    BackendModule,
    FrontendModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    DatabaseModule,
    AuthenticationModule,

  ],
  controllers: [],
  providers: [{
    //log error
    provide: APP_FILTER,
    useClass: ExceptionsLoggerFilter,
  },
  {
    //filter response
    provide: APP_INTERCEPTOR,
    useClass: TransformationInterceptor,
  }
  ],
})
export class AppModule { }
