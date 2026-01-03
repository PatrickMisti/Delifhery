export class Address {
  constructor(
    public addressId: number,
    public street: string,
    public houseNumber: string,
    public postalCode: string,
    public city: string,
    public country: string
  ) {}

  static fromJson(json: any): Address {
    return new Address(
      json?.addressId ?? 0,
      json?.street ?? "",
      json?.houseNumber ?? "",
      json?.postalCode ?? "",
      json?.city ?? "",
      json?.country ?? ""
    );
  }
}
