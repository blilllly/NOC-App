import { envs } from './envs.plugins';

describe('envs.plugin.ts', () => {
  it('should return env options', () => {
    expect(envs).toEqual({
      PORT: envs.PORT,
      MAILER_EMAIL: envs.MAILER_EMAIL,
      MAILER_SECRET_KEY: envs.MAILER_SECRET_KEY,
      PROD: false,
      RESEND_API_KEY: envs.RESEND_API_KEY,
      MONGO_URL: envs.MONGO_URL,
      MONGO_DB_NAME: envs.MONGO_DB_NAME,
      MONGO_USER: envs.MONGO_USER,
      MONGO_PASS: envs.MONGO_PASS,
      POSTGRES_URL: envs.POSTGRES_URL,
    });
  });

  it('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugins.js');
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
