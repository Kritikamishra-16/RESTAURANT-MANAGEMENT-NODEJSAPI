const redis = require('../config/redis');
const DishService= require('../services/dishService');
const dishService= new DishService();

const create= async (req,res)=>{
    try{
        const response= await dishService.create({
            dishName: req.body.dishName,
            availableQuantity: req.body.availableQuantity,
            pricePerItem: req.body.pricePerItem,
            dishType: req.body.dishType,
            servesPeople: req.body.servesPeople
        });
        
        console.log(response);
        return res.status(201).json({
            message: "Successfully added a new dish",
            data: response,
            success:true,
            err: {}
        })
        
    }catch(error){
        console.log(error);
        return res.status(412).json({   
            data:{},
            message:"Not able to add a new dish",
            success: false,
            err:error
        });
    }
}

const destroy= async (req,res)=>{
    try{
        const response= await dishService.destroy(req.params.dishName);
        return res.status(200).json({
            message: "Successfully removed a dish",
            data: response,
            success:true,
            err: {}
        })

    }catch(error)
    {
        console.log(error);
        return res.status(404).json({
            data:{},
            message:"Not able to delete dish",
            success: false,
            err:error
        });
    }
}

const getAll= async (req,res)=>{
    try{
        const response= await dishService.getAll();
        return res.status(200).json({
            message: "Successfully fetched all the dishes",
            data: response,
            success:true,
            err: {}
        })
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to fetch all dishes",
            success: false,
            err:error
        });
    }
}

const update= async (req,res)=>{
    try{
        const dishData={
            dishName: req.body.dishName,
            quantity: req.body.quantity,
            price: req.body.price
        }
        const response= await dishService.update(dishData);
        console.log(response);
        return res.status(200).json({
            message: "Successfully updated a dish",
            data: response,
            success:true,
            err: {}
        })
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to update a dish",
            success: false,
            err:error
        });
    }
}

const getByName= async (req,res)=>{
    try{
        const response= await dishService.get(req.params.dishName);
        return res.status(200).json({
            message: "Successfully fetched a dish",
            data: response,
            success:true,
            err: {}
        })
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to fetch a dish",
            success: false,
            err:error
        });
    }
}

const purchase= async (req,res)=>{
    try{
        const {amountPaid, orderedDishesArray}=req.body;
        const response= await dishService.purchase(amountPaid, orderedDishesArray);
        
        const existingAmount= await redis.get('totalAmount');
        const parsedExistingAmount = existingAmount ? parseFloat(existingAmount) : 0;
        console.log(parsedExistingAmount);
        const newTotalAmount= parsedExistingAmount+ response.amountToBePaid;
        await redis.set('totalAmount', newTotalAmount);

        return res.status(200).json({
            message: "Successfully purchased a dish",
            data: {
                changeRs: response.change,
                accumulatedTotalAmount: newTotalAmount
            },
            success:true,
            err: {}
        })
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to Purchase a dish",
            success: false,
            err:error
        });
    }finally{
        
    }
}

module.exports={
    create,
    destroy,
    getAll,
    update,
    getByName,
    purchase
}