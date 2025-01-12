export enum Role {
  ADMIN,
  MEMBER,
}

export interface UserData {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: Role;
  updatedAt: Date;
}
