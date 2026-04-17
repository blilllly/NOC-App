import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mgLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const pgLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());

const logRepositories = [fsLogRepository, mgLogRepository, pgLogRepository];

// const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...');

    // Mandar email

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'alvearbilly@gmail.com',
    // ]);
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

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';

    //   new CheckServiceMultiple(
    //     logRepositories,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });
  }
}
