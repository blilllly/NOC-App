import { envs } from './config/plugins/envs.plugins';
import { Server } from './presentation/server';

(async () => {
  await main();
})();

function main() {
  Server.start();
  // console.log(envs.PORT);
}
