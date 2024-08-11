import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) { }
  async create(createProductDto: CreateProductDto) {
    console.log('createProductDto: ', createProductDto);

  }

  findAll() {


    const queryRunner = this.dataSource.createQueryRunner();
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
