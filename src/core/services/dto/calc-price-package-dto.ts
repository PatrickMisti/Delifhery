export class CalcPricePackageDto {
  constructor(
    public postalCodeDest: string,
    public countryDest: string,
    public postalCodeOrigin: string,
    public countryOrigin: string,
    public width: number,
    public height: number,
    public length: number,
    public weight: number) {
  }
}
