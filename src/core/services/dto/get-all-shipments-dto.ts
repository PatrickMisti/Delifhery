import {Shipment} from '../../models/shipment';


export class GetAllShipmentsDto {
  public sendShipment: Shipment[];
  public receiveShipment: Shipment[];

  constructor(sendShipment: Shipment[], receiveShipment: Shipment[]) {
    this.sendShipment = sendShipment;
    this.receiveShipment = receiveShipment;
  }
}
