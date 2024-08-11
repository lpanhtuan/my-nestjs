import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, SerializeOptions, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import findIdParams from 'src/common/findOneParams/findOneParams';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperUploadFile } from 'src/common/uploadFile/helperUploadFile';
import { Express } from 'express';


@Controller('users')
@SerializeOptions({})
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);

  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('list')
  getlistuser() {
    return this.usersService.getListUser()
  }

  @Get('getbyid')
  findOne(@Query('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('allPostByIdUser')
  findAllPostByIdUser(@Query('id') id: number) {
    console.log('id: ', id);
    return this.usersService.findAllPostByIdUser(id)
  }

  @Get('getbyemail')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperUploadFile.destinationPath,
        filename: HelperUploadFile.customFileName,
      }),
    }),
  )
  uploadFile(@Query('id') id: number, @UploadedFile() file: any) {
    return this.usersService.saveAvatarWithId(file?.filename, Number(id))
  }


}
