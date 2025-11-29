// src/models/entity/user.entity.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  constructor(
    private _user_id: number,
    private _name: string,
    private _email: string,
    private _password: string,
    private _address: string,
    private _role: UserRole = UserRole.USER,
  ) {}

  // Getters
  public get user_id(): number {
    return this._user_id;
  }
  public get name(): string {
    return this._name;
  }
  public get email(): string {
    return this._email;
  }
  public get password(): string {
    return this._password;
  }
  public get address(): string {
    return this._address;
  }
  public get role(): UserRole {
    return this._role;
  }

  // Setters simples
  public set name(value: string) {
    this._name = value;
  }
  public set email(value: string) {
    this._email = value;
  }
  public set password(value: string) {
    this._password = value;
  }
  public set address(value: string) {
    this._address = value;
  }
  public set role(value: UserRole) {
    this._role = value;
  }

  // Método para devolver objeto plano
  public toJSON() {
    return {
      user_id: this._user_id,
      name: this._name,
      email: this._email,
      password: this._password,
      address: this._address,
      role: this._role,
    };
  }
}
