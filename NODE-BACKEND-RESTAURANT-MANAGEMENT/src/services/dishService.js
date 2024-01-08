const DishRepository= require('../repository/dishRepository');

class DishService{
    constructor(){
        this.dishRepository= new DishRepository();
    }

    async create(data){
        try{
            const dish= await this.dishRepository.create(data);
            return dish;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async destroy(dishName){
        try{
            const deletedDish= await this.dishRepository.destroy(dishName);
            return deletedDish;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async getAll(){
        try{
            const dishes= await this.dishRepository.getAll();
            return dishes;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async update(data){
        try{
            const updatedDish= await this.dishRepository.update(data);
            return updatedDish;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async get(dishName){
        try{
            const fetchedDish= await this.dishRepository.get(dishName);
            return fetchedDish;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async purchase(amountPaid, orderedDishesArray){
        try{
            const transactionObj= await this.dishRepository.purchase(amountPaid, orderedDishesArray);
            return transactionObj;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }
}

module.exports=DishService;