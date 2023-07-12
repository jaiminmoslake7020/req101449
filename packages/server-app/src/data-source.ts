import "reflect-metadata"
import { DataSource } from "typeorm"
import {Product} from './models/Product';

console.log({
    type: "mariadb",
    host: "db",
    port: 3306,
    database: "req101449",
    username: "root",
    password: "jaiminPandya!!!",
});
export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "db",
    port: 3306,
    database: "req101449",
    username: "root",
    password: "jaiminPandya!!!",
    synchronize: true,
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
})
