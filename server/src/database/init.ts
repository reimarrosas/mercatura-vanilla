import pg, { IEventContext } from 'pg-promise';

const initOption =
  process.env['NODE_ENV'] === 'production' ?
    {} : {
      query (e: IEventContext) {
        console.log(e.query);
      }
    };

const connectionString = process.env['DATABASE_URL'] ?? 'postgres://postgres@localhost:5432/postgres';

export default pg(initOption)(connectionString);