const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { dbConnection } = require('../database/config');


class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:     '/api/uploads',
            users:      '/api/users',
        }


        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleWares();


        //Rutas de mi app

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middleWares(){

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))

        //File upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));

    }

    routes() {
        
        this.app.use(this.paths.auth,       require('../routes/auth'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.products,   require('../routes/products'))
        this.app.use(this.paths.search,     require('../routes/search'))
        this.app.use(this.paths.uploads,    require('../routes/uploads'))
        this.app.use(this.paths.users,      require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        })
    }
}

module.exports = Server;