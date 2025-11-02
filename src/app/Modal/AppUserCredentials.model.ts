
export class AppUserCredentials {
  constructor(
    public id: string | null = null,
    public userId: string | null = null,
    public passwordHash: string | null = null,
    public salt: string | null = null,
    public lastPasswordChanged: string | null = null,
    public isFirstLogin: boolean | null = null
  ) {}
}