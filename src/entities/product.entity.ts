import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./baseEntity/base.enitity";
import { Type } from "class-transformer";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    productId?: number;

    @Column()
    public productName?: string;

    @Column()
    public productPrice?: string;

    @Column()
    public productDes?: string;

    @Column()
    public productImage?: string;

    @Column()
    public productActive?: string;

    @Column()
    public productCategory?: string;

}
