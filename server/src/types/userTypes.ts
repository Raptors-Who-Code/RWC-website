export enum Role {
  ADMIN,
  MEMBER,
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  profilePicUrl: string | null;
}
