import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from './data/mongodb';
import { Server } from './presentation/server';

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connet({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // Crear una colección = tables, documento = registro

  // const newLog = await LogModel.create({
  //   message: 'Test message desde Mongo',
  //   origin: 'App.ts',
  //   level: 'low',
  // });

  // await newLog.save();

  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
  // console.log('server started..');
}
