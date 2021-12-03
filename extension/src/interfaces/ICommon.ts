export interface IRequest2Server {
  token: string;
  shortcut: string;
}

export interface IResponse2Client {
  error?: boolean;
  message?: string;
  event?: 'up' | 'down';
}
