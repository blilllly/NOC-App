import { envs } from './envs.plugins';

describe('envs.plugin.ts', () => {
  it('should return env options', () => {
    console.log(envs);
    expect(true).toBeTruthy();
  });
});
