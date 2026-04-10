import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new postgrestSQLDatasource(),
  // new mongoLogDS(),
  // new oracleDS(),
);

export class Server {
  public static start() {
    console.log('Server started...');

    // Mandar email
    // const emailService = new EmailService(fileSystemLogRepository);

    // emailService.sendEmailWithFileSytemLogs(['alvearbilly@gmail.com']);

    // emailService.sendEmail({
    //   to: 'alvearbilly@gmail.com',
    //   subject: 'Logs de sistema',
    //   html: `
    //     <h3>Logs de sistema - NOC</h3>
    //     <p>Sint aliquip consectetur aute cupidatat velit labore tempor qui sunt adipisicing. Exercitation adipisicing exercitation occaecat deserunt id. Quis est duis eu aute pariatur aliqua enim in sint.</p>
    //     <p>Ver logs adjuntos</p>
    //   `,
    // });

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    //   // new CheckService().execute('http://localhost:3000');
    // });
  }
}
