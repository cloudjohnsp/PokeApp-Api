class User implements IUser {
  public constructor(
    public id: string,
    public nickName: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public lastUpdatedAt: Date
  ) {
    this.id = id;
    this.nickName = nickName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
  }

  public static Create(
    nickName: string,
    email: string,
    password: string
  ): User {
    return new User(
      crypto.randomUUID(),
      nickName,
      email,
      password,
      new Date(),
      new Date()
    );
  }
}
