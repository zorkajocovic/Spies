export class Rate {
    RateID: number;
    ClientID: number;
    SerId: number;
    Value: number;

    constructor(serid: number){
        this.SerId=serid;
    }
}
