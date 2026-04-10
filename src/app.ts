import { envs } from './config/plugins/envs.plugins';
import { MongoDatabase } from './data/mongodb';
import { Server } from './presentation/server';

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connet({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  // Server.start();
  // console.log('server started..');
}
