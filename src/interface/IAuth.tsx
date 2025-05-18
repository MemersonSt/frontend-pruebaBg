interface IAuth {
  username: string;
  password: string;
}

interface IAuthResponse {
  id: number;
  username: string;
  token: string;
}

export type { IAuth, IAuthResponse };
