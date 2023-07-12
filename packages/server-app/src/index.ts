import express from "express"
import bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import productRoutes from "./routes/productRoutes";
import swaggerDocs from "./utils/swagger";
import healthRoute from './routes/healthRoute';
import cors from 'cors';

// setup express app here
// ...
// create express app
const app = express();
app.use(cors());
app.use(bodyParser.json())


AppDataSource.initialize().then(async () => {
    console.log("Connection successful");

    const port = 3000;
    // start express server
    app.listen(port, () => {
        healthRoute(app);
        productRoutes(app);
        swaggerDocs(app, port);
    });

}).catch(error => {
    console.log("Connection failed");
    console.log(error);

    const port = 3000;
    // start express server
    app.listen(port, () => {
        healthRoute(app);
    });
});

