export interface Role {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  roles: Role[];
  groups: any[];
}
