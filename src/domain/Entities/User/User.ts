import { randomUUID } from 'crypto';

export class User {
  private _id: string;
  private _nickName: string;
  private _email: string;
  private _password: string;
  private _createdAt: Date;
  private _lastUpdatedAt: Date;

  constructor(
    id: string,
    nickName: string,
    email: string,
    password: string,
    createdAt: Date,
    lastUpdatedAt: Date
  ) {
    this._id = id;
    this._nickName = nickName;
    this._email = email;
    this._password = password;
    this._createdAt = createdAt;
    this._lastUpdatedAt = lastUpdatedAt;
  }

  public get id(): string {
    return this._id;
  }

  public get nickName(): string {
    return this._nickName;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get lastUpdatedAt(): Date {
    return this._lastUpdatedAt;
  }

  public static create(nickname: string, email: string, password: string) {
    return new User(
      randomUUID(),
      nickname,
      email,
      password,
      new Date(),
      new Date()
    );
  }
}
