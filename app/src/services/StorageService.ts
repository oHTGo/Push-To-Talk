import ini from 'ini';
import fs from 'fs';
import { IStorage } from '../interfaces/IStorage';

export class StorageService {
  private configuration: IStorage;
  private configPath = './config.ini';

  constructor() {
    if (!fs.existsSync(this.configPath)) fs.writeFileSync(this.configPath, '');
    this.configuration = ini.parse(fs.readFileSync(this.configPath, 'utf-8')) as IStorage;
  }

  getToken(): string {
    return this.configuration.token;
  }

  setToken(token: string) {
    this.configuration.token = token;
    fs.writeFileSync(this.configPath, ini.stringify(this.configuration));
  }
}
