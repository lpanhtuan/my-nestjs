import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    productName: string;
    @IsString()
    productPrice: string;
    @IsString()
    productDes: string;
    @IsString()
    productImage: string;
    @IsString()
    productCategory: string;
    @IsString()
    productActive: string;

}
