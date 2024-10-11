export interface ILoginDto {
  email: string
  password: string
}

export interface IRegisterDto {
  email: string
  password: string
  name: string
}

export enum EnumAuthEndpoints {
  AUTH = '/auth'
}
