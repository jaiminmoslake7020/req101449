import { IsNotEmpty } from 'class-validator';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum ProductSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    public productId: string;

    @IsNotEmpty()
    @Column()
    public webProductId: number;

    @IsNotEmpty()
    @Column()
    public productName: string;

    @IsNotEmpty()
    @Column("mediumtext")
    public productDescription: string;

    @IsNotEmpty()
    @Column()
    public productColour: string;

    @IsNotEmpty()
    @Column({
        type: "enum",
        enum: ProductSize,
        default: ProductSize.SMALL
    })
    public productSize: ProductSize;

    public toString(): string {
        return `${this.productName}`;
    }

}
