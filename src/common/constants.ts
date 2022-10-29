export enum UserStatus {
  NEW,
  ACTIVE,
  LOCK,
}

export enum UserRole {
  MANAGER = 'MANAGER',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}
export enum ManagerRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}
export enum Gender {
  MALE,
  FEMALE,
}
export enum PostgresErrorCode {
  UniqueViolation = '23505',
}
