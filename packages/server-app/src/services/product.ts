import {AppDataSource} from '../data-source';
import {Product} from '../models/Product';
import {Error} from '../schema/error.schema'
import {ObjectLiteral} from 'typeorm';
import {CreateProductInput, DeleteProductInput, UpdateProductInput} from '../schema/product.schema';
import {Success} from '../schema/success.schema';

const getProductRepo = () => {
    return AppDataSource.getRepository(Product)
}


export const getProducts = async (where: string, whereArgs: ObjectLiteral):Promise<Product[]> => {
    return await  getProductRepo().find();
}


export const getProductById = async (id:string): Promise<Product|Error> => {
    // @ts-ignore
    const result = await getProductRepo().findOne({
        where: {productId: id}
    });
    if (
        !result ||
        ( result && result.productId !== id )
    ) {
        return {
            status: 404,
            message: "Product not found."
        };
    }
    return result;
}



export const saveProduct = async (productInput:CreateProductInput):Promise<Product|Error> => {
    const {
        productName,
        productColour,
        productSize,
        productDescription,
        webProductId
    } = productInput.body;

    const product = Object.assign(new Product(), {
        webProductId,
        productName,
        productColour,
        productSize,
        productDescription,
    });

    const saveProduct = await getProductRepo().save(product);
    const productId = saveProduct.productId;
    return await getProductById(productId);
}


export const updateProduct = async (productInput:UpdateProductInput):Promise<Product|Error> => {
    const { id } = productInput.params;
    const oldProduct = await getProductRepo().findOneBy({
        productId: id
    });
    if (!oldProduct) {
        return  {
            status: 404,
            message: "Product not found."
        };
    }
    const {
        productName,
        productColour,
        productSize,
        productDescription,
        webProductId
    } = productInput.body;

    const product = Object.assign(oldProduct, {
        webProductId,
        productName,
        productColour,
        productSize,
        productDescription
    });

    const saveProduct = await getProductRepo().save(product);
    const productId = saveProduct.productId;

    return await getProductById(productId);
}


export const  deleteProduct = async (productInput:DeleteProductInput):Promise<Success|Error> => {
    const id = productInput.params.id
    let productToRemove = await getProductRepo().findOneBy({ productId:id })

    if (!productToRemove) {
        return  {
            status: 404,
            message: "Product not found."
        };
    }
    await getProductRepo().remove(productToRemove)
    return {
        status: 200,
        message: "Product deleted successfully"
    };
}
