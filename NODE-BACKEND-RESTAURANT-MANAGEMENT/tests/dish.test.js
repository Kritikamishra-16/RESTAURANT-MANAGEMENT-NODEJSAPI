const mongoose=require('mongoose');
const request= require('supertest');
const {app, closeServer}= require('../src/index');
const redis = require('../src/config/redis');
const { response } = require('express');
require('dotenv').config();

/* Connecting to the database before each test */
beforeAll(async()=>{
    await mongoose.connect(process.env.MONGODATABASE_URI);
});



    describe("GET /api/v1/dish", () => {

        it("should return all dishes in DB", async () => {
          const res = await request(app).get("/api/v1/dish")
          .set({"auth":"kritikasSecretKey"});
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("Successfully fetched all the dishes");
          expect(res.body.data.length).toBeGreaterThan(0);
        });

        it("get all dishes api unauthorized", async()=>{
          const res = await request(app).get("/api/v1/dish");
          expect(res.statusCode).toBe(401);
          expect(res.body.message).toBe("Unauthorized Access");
        });

      });

    describe('Invlaid API /xyz', ()=>{
      it("REST api is not valid", async()=>{
        const res = await request(app).get("/xyz")
          .set({"auth":"kritikasSecretKey"});
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Invalid API/ Unable to find requested resource");
      });
    });
     

    // describe("GET /api/v1/dish/:dishName", () => {

    //   it("should return corresponsing dish with given dishName in db", async () => {
    //     const res = await request(app).get("/api/v1/dish/demodish")
    //     .set({"auth":"kritikasSecretKey"});
    //     console.log(res);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.message).toBe("Successfully fetched a dish");
    //     expect(res.body.data.dishName).toBe("demodish");
    //   });

    //   it("dishName not present in db", async () => {
    //     const res = await request(app).get("/api/v1/dish/xyz")
    //     .set({"auth":"kritikasSecretKey"});
    //     console.log(res);
    //     expect(res.statusCode).toBe(500);
    //     expect(res.body.message).toBe("Not able to fetch a dish");
    //   });

    // });


    // describe('Delete API /api/v1/Dish/:dishName', () => {
    //   it('Delete the dish and return it as response', async () => {
    //     const res = await request(app).delete("/api/v1/dish/demodish1")
    //     .set({"auth":"kritikasSecretKey"})
    //       expect(res.statusCode).toBe(200);
    //       expect(res.body.message).toBe("Successfully removed a dish");
    //   });

    //   it('Given dish not present in Db, dish not found', async () => {
    //     const res = await request(app).delete("/api/v1/dish/xyz")
    //     .set({"auth":"kritikasSecretKey"})
    //       expect(res.statusCode).toBe(404);
    //       expect(res.body.message).toBe("Not able to delete dish");
    //       expect(res.body.err.error.error.message).toBe("Dish not found");
    //   });


    // });


    // describe('PUT- update dish api /api/v1/dish', () => {
    //   it('should return a success message and updated dish', async () => {
    //     const requestBody = {
    //       dishName: 'FiredRice',
    //       quantity: 1,
    //       price: 550
    //     };
    //     const response = await request(app).put("/api/v1/dish")
    //     .set({"auth":"kritikasSecretKey"})
    //     .send(requestBody);
    //     expect(response.statusCode).toBe(200);
    //     expect(response._body.success).toBe(true);
    //     expect(response._body.message).toBe('Successfully updated a dish');
    //     expect(response._body.data.dishName).toBe('FiredRice');
    //     expect(response._body.data.availableQuantity).toBeGreaterThan(1);
    //   });

    //     it('when failing to update a dish, should return an error message', async () => {
    //       const requestBody = {
    //         quantity: 12,
    //         price: 550,
    //       };

    //       const response = await request(app).put("/api/v1/dish")
    //       .set({"auth":"kritikasSecretKey"})
    //       .send(requestBody);
    //       //console.log(response);

    //       expect(response.statusCode).toBe(400);
    //       expect(response._body.success).toBe(false);
    //       expect(response._body.message).toBe('Update data Validation failed');
    //     });

    //     it('If dish not present in db', async () => {
    //       const requestBody = {
    //         dishName: "xyz",
    //         quantity: 12,
    //         price: 550,
    //       };

    //       const res = await request(app).put("/api/v1/dish")
    //       .set({"auth":"kritikasSecretKey"})
    //       .send(requestBody);
    //       //console.log(res);
    //       expect(res.statusCode).toBe(500);
    //       expect(res._body.message).toBe("Not able to update a dish");
    //       expect(res._body.success).toBe(false);
      
    //   });

    // });


    describe('/POST add dishes API /api/v1/dish',()=>{
      it("Add a dish in database", async()=>{
        const res= await request(app).post('/api/v1/dish')
        .set({"auth":"kritikasSecretKey"})
        .send({
          "dishName": "new dish2",
          "availableQuantity": "12",
          "pricePerItem": "5500",
          "servesPeople": "5",
          "dishType": "dessert"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Successfully added a new dish");
        expect(res.body.data.dishName).toBe("new dish2")
        expect(res.body.data.dishType).toBe("dessert")
        expect(res.body.data.availableQuantity).toBe(12)
        expect(res.body.data.servesPeople).toBe(5)

      })
    })




  /* Closing database, snd openahandlers connection after all tests */

  const teardown = async (redis) => {
    await new Promise((resolve) => {
      redis.quit();
      redis.on('end', resolve);
    });
  };
  

afterAll( async() => {
    mongoose.connection.close();
    await closeServer();
    await teardown(redis);
  });


