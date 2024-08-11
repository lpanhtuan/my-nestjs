import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter'
async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    //catch loi error
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter))

    //validate data
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }))

    //an cac truong repon, expose
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    )
    //cookie
    app.use(cookieParser())

    //port
    await app.listen(process.env.PORT)
}
bootstrap()
