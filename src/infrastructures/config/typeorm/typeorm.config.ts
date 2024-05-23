import { DataSource } from "typeorm";

const config = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "",
    database: 'solid_nest_db',
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    migrations: ['database/migrations/**/*{.ts,.js}'],
});

config
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });

export default config;