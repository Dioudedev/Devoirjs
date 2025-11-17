const express = require("express");

const app = express();
app.use(express.json());

let cars=[
{ "id": 1, "brand": "Toyota", "model": "Corolla", "year": 2020,
    "available": true, "pricePerDay": 25000 },
{ "id": 2, "brand": "Peugeot", "model": "308", "year": 2019,
"available": false, "pricePerDay": 20000 }
];

app.get('/cars', (req, res) => {
res.json(cars);
});

app.get('/cars/:id', (req, res) => {
const id =req.params.id;
const car =cars.find((v)=> v.id ==id);
if (!car) res.send('car non trouvé');
else
res.json(car);
});

app.post('/cars', (req, res) => {
const newCar= {
    id: req.body.id,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    available: req.body.available,
    pricePerDay: req.body.pricePerDay
}
cars.push(newCar);
res.send("car ajouter avec succes");
});
app.put('/cars/:id', function(req, res) {
const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === id);
    if (carIndex === -1) {
    return res.status(404).json({ message: "car non trouvée" });
    }
cars[carIndex] = {
    id: id,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    available: req.body.available,
    pricePerDay: req.body.pricePerDay
    };
    res.send("car mise à jour avec succès");
});



app.delete('/cars/:id', (req, res) =>{
    const id=req.params.id;
    car = cars.filter((v)=>v.id != id);
res.send('car supprimé');
});

app.get('/cars', (req, res) => {
let result = cars;
const { brand, model, year, available, minPrice, maxPrice } = req.query;
if (brand) {
    result = result.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
}
if (model) {
    result = result.filter(c => c.model.toLowerCase() === model.toLowerCase());
}
if (year) {
    result = result.filter(c => c.year == year);
}
if (available) {
    const boolAvailable = (available === "true");
    result = result.filter(c => c.available === boolAvailable);
}
if (minPrice) {
    result = result.filter(c => c.pricePerDay >= parseFloat(minPrice));
}
if (maxPrice) {
    result = result.filter(c => c.pricePerDay <= parseFloat(maxPrice));
}
if (result.length === 0) {
    return res.status(404).json({ message: "Aucune voiture trouvée" });
}
res.json(result);
});
app.listen(8080, () => {
    console.log("Serveur en cours");
});