export enum Role {
  ADMIN,
  MEMBER,
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
