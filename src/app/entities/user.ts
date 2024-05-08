import { Gender, UserType } from '@prisma/client';

export interface UserProps {
  userId?: string;
  firstName: string;
  lastName: string;
  unique_register: string;
  email: string;
  phoneNumber?: string;
  gender: Gender;
  birthdayDate?: Date;
  hashPassword: string;
  userType: UserType;
  hashRefreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  public get userId(): string | undefined {
    return this.props.userId;
  }

  public set userId(userId: string | undefined) {
    this.props.userId = userId;
  }

  public get fullName(): string {
    return this.props.firstName + ' ' + this.props.lastName;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get unique_register(): string {
    return this.props.unique_register;
  }

  public set unique_register(unique_register: string) {
    this.props.unique_register = unique_register;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get phoneNumber(): string | undefined {
    return this.props.phoneNumber;
  }

  public set phoneNumber(phoneNumber: string | undefined) {
    this.props.phoneNumber = phoneNumber;
  }

  public get gender(): Gender {
    return this.props.gender;
  }

  public set gender(gender: Gender) {
    this.props.gender = gender;
  }

  public get birthdayDate(): Date | undefined {
    return this.props.birthdayDate;
  }

  public set birthdayDate(birthdayDate: Date | undefined) {
    this.props.birthdayDate = birthdayDate;
  }

  public get hashPassword(): string {
    return this.props.hashPassword;
  }

  public set hashPassword(hashPassword: string) {
    this.props.hashPassword = hashPassword;
  }

  public get userType(): UserType {
    return this.props.userType;
  }

  public set userType(userType: UserType) {
    this.props.userType = userType;
  }

  public get hashRefreshToken(): string {
    return this.props.hashRefreshToken;
  }

  public set hashRefreshToken(hashRefreshToken: string | undefined) {
    this.props.hashRefreshToken = hashRefreshToken;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt;
  }
}
