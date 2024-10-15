export interface IUserProps {
  nickName: string;
  email: string;
  password: string;
  createdAt: Date;
  lastUpdatedAt?: Date | null;
}

class User {
  private _id: number | null;
  private _props: IUserProps;

  constructor(props: IUserProps, id?: number) {
    this._id = id ?? null;
    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): number | null {
    return this._id;
  }

  public get nickName(): string {
    return this._props.nickName;
  }

  public set nickName(nickName: string) {
    this._props.nickName = nickName;
  }

  public get email(): string {
    return this._props.email;
  }

  public set email(email: string) {
    this._props.email = email;
  }

  public set password(password: string) {
    this._props.password = password;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get lastUpdatedAt(): Date | null {
    return this._props.lastUpdatedAt ?? null;
  }

  public set lastUpdatedAt(lastUpdatedAt: Date) {
    this._props.lastUpdatedAt = lastUpdatedAt;
  }
}
