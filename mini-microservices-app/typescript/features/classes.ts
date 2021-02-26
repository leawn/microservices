class Vehicle {
    color: string = 'red';

    constructor(color: string) {
        this.color = color;
    }

    public drive(): void {
        console.log('chugga chugga');
    }

    protected honk(): void {
        console.log('beep');
    }
}

class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        super('red');
    }

    public drive(): void {
        console.log('vroom');
    }

    private stop():void {
        console.log('car stopped');
    }

    public startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const car = new Car(4,'red');
car.startDrivingProcess();

const vehicle = new Vehicle('orange');
console.log(vehicle.color);
vehicle.drive();