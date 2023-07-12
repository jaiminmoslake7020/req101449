import * as Faker from 'faker';
import {define} from 'typeorm-seeding';

import {ProductSize, Product} from '../../models/Product';

define(Product, (faker: typeof Faker, settings: { role: string }) => {

    const productSizeList = [ProductSize.SMALL, ProductSize.MEDIUM, ProductSize.LARGE];

    const productName = faker.commerce.productName();
    const product = new Product();
    product.productName = productName;
    product.productDescription = faker.lorem.paragraph(3);
    product.productColour = faker.commerce.color();
    product.productSize = productSizeList[faker.random.number(2)];
    return product;
});
