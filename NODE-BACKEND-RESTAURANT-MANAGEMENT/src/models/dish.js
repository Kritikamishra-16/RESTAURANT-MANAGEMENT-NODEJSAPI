const mongoose=require('mongoose');


const dishSchema=new mongoose.Schema({
    dishName:{
        type: String,
        requires: true,
        unique: true,
    },
    availableQuantity:{
        type: Number,
        required: true,
        min: 0
    },
    pricePerItem:{
        type: mongoose.Decimal128,
        required: true,
        min: 1,
    },
    dishType:{
        type: String,
        enum: ['maincourse','starter', 'beverage','dessert', 'other'],
        required: true
    },
    servesPeople:{
        type: Number,
        required: true,
        min: 1
    },
});



const Dish= mongoose.model('Dish',dishSchema);
module.exports= Dish;
