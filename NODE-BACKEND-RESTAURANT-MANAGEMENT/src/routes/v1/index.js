const express= require('express');
const router= express.Router();
const DishController= require('../../controllers/dishControllers');
const {validateAPI}= require('../../middlewares/index');

router.post(
    '/dish',
    validateAPI.validateAuth,
    validateAPI.validateDishData,
    DishController.create
)

router.get(
    '/dish',
    validateAPI.validateAuth,
    DishController.getAll
)

router.get(
    '/dish/:dishName',
    validateAPI.validateAuth,
    DishController.getByName
)

router.delete(
    '/dish/:dishName',
    validateAPI.validateAuth,
    DishController.destroy
)

router.put(
    '/dish',
    validateAPI.validateAuth,
    validateAPI.validateUpdateDishData,
    DishController.update
)

router.post(
    '/dish/purchase',
    validateAPI.validateAuth,
    validateAPI.validatePurchaseApiRequest,
    DishController.purchase
)

module.exports= router;