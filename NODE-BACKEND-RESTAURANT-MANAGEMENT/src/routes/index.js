const express= require('express');
const v1ApiRoutes= require('./v1/index');
const {validateAPI} = require('../middlewares/index');
const router= express.Router();

router.use('/v1',v1ApiRoutes);
router.use('*', validateAPI.invalidApiCheck);
module.exports=router;