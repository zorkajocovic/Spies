export class Item {
    ItemID: number;
    Price: number;
    VehicleID: number;


    constructor(vehicle: number, price: number){
        this.VehicleID=vehicle;
        this.Price=price;
    }

}
