import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Product } from '../../models/Product';
export default class CreateProducts implements Seeder {

    // @ts-ignore
    public async run(factory: Factory, connection:Connection): Promise<void> {
        console.log('CreateProducts');
        await factory(Product)().seedMany(40);

        // const em = connection.createEntityManager();
        // await times(40, async (n) => {
        //     const product = await factory(Product)().create();
        //     await em.save(product);
        //     return product;
        // });
    }

}
