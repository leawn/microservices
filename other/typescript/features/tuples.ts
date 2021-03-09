const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40
};

type Drink = [string, boolean, number]; // color, isFromPepsiCo, mg of sugar

const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['transparent', false, 40];


const carSpecs: [number, number] = [400, 3354];

const carStats = {
    horsepower: 400,
    weight: 3354
};