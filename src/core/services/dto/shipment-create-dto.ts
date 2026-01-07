import {AddressDto} from './update-user-dto';

export class ShipmentCreateDto {
  constructor(
    public senderId: number,
    public receiverAddress: AddressDto,
    public receiverName: string,

    public widthCm: number,
    public heightCm: number,
    public lengthCm: number,
    public weightKg: number,

    public redirectUrl: string,
    public notification: boolean
  ) {}
}
