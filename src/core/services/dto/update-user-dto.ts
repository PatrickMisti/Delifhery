import {User} from '../../models/user';

export class UpdateUserDto {
  constructor(
    public userId: number,
    public subject: string,
    public userName: string,
    public email: string,
    public phoneNumber: string | null = null,
    public address: AddressDto | null = null
  ) {
  }

  static fromUser(user: User) : UpdateUserDto {
    return new UpdateUserDto(
      user.userId,
      user.subject,
      user.userName,
      user.email,
      user.phoneNumber,
      user.address ? new AddressDto(
        user.address?.addressId ?? 0,
        user.address.street,
        user.address.houseNumber,
        user.address.postalCode,
        user.address.city,
        user.address.country
      ) : null
    );
  }
}

export class AddressDto {
  constructor(
    public addressId: number | null,
    public street: string,
    public houseNumber: string,
    public postalCode: string,
    public city: string,
    public country: string
  ) {
  }
}
