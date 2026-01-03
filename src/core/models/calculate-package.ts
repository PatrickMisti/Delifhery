
export class CalculatePackage {
  constructor(
    public postalCodeDest: string,
    public countryDest: string,
    public postalCodeOrigin: string,
    public countryOrigin: string,
    public width: number,
    public height: number,
    public length: number,
    public weight: number
  ) {}

  static fromJson(json: any): CalculatePackage {
    return new CalculatePackage(
      json?.postalCodeDest ?? '',
      json?.countryDest ?? '',
      json?.postalCodeOrigin ?? '',
      json?.countryOrigin ?? '',
      Number(json?.width ?? 0),
      Number(json?.height ?? 0),
      Number(json?.length ?? 0),
      Number(json?.weight ?? 0)
    );
  }

  toJson(): Record<string, any> {
    return {
      postalCodeDest: this.postalCodeDest,
      countryDest: this.countryDest,
      postalCodeOrigin: this.postalCodeOrigin,
      countryOrigin: this.countryOrigin,
      width: this.width,
      height: this.height,
      length: this.length,
      weight: this.weight,
    };
  }
}
