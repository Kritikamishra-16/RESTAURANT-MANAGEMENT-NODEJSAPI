const Joi= require('joi');
const {AUTHKEY} = require('../config/serverConfig'); 

const dishValidationSchema= Joi.object({
    dishName: Joi.string().required(),
    availableQuantity: Joi.number().min(0).required(),
    pricePerItem: Joi.number().min(1).required(),
    dishType: Joi.string().valid('maincourse', 'starter', 'dessert', 'beverage', 'other').required(),
    servesPeople: Joi.number().min(1).required(),
});


const updatedishValidationSchema= Joi.object({
    dishName: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(1).required()
});

const validateUpdateDishData= (req,res,next)=>{
    const {error}= updatedishValidationSchema.validate(
        req.body,
        {abortEarly: false}
    );
    if(error){
        return res.status(400).json({
            success: false,
            message: 'Update data Validation failed',
            errors: error
          });
    }

    next();

}

const validateDishData= (req,res,next)=>{
    const {error}= dishValidationSchema.validate(
        req.body,
        {abortEarly: false}
    );

    if(error){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error
          });
    }

    next();

}

const dishSchema = Joi.object({
    dishName: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
});

const apiRequestSchema = Joi.object({
    amountPaid: Joi.number().min(0).required(),
    orderedDishesArray: Joi.array().items(dishSchema).min(1).required()
});

const validatePurchaseApiRequest = (req, res, next) => {
    const { error } = apiRequestSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ message: 'Validation failed', errors: error.details });
    }

    next();
};

const validateAuth= (req,res,next)=>{
    //console.log(req.headers.auth,AUTHKEY);
    const authHeader= req.headers.auth;
    if(!authHeader || authHeader!== AUTHKEY ){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Access' 
        });
    }

    next();
}

const invalidApiCheck=(req,res)=>{
    return res.status(404).json({
        data:{},
        message:"Invalid API/ Unable to find requested resource",
        success: false,
    });
}

module.exports= {
    validateDishData,
    validateUpdateDishData,
    validatePurchaseApiRequest,
    validateAuth,
    invalidApiCheck
}

