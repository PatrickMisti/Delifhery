import {KeycloakTokenParsed} from 'keycloak-js';

export class CreateUserDto {
  constructor(
    public subject: string,
    public userName: string,
    public email: string,
    public phoneNumber: string | null = null,
    public address: CreateAddressDto | null = null
  ) {}

  static fromProfile(profile?: KeycloakTokenParsed | null): CreateUserDto | null {
    if (!profile) return null;
    return new CreateUserDto(
      profile.sub || '',
      profile['preferred_username'] || '',
      profile['email'] || '',
      profile['phonenumber'] || null
    );
  }
}

export class CreateAddressDto {
  constructor(
    public street: string,
    public city: string,
    public houseNumber: string,
    public postalCode: string,
    public country: string
  ) {}
}


