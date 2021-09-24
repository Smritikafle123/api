const Product = require('../models/productModel');
const Booking= require('../models/bookingModel')
const mongoose = require('mongoose');
const User = require('../models/customer_model');
const url = 'mongodb://127.0.0.1:27017/Ecommercemusic';
 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
})
 
afterAll(async () => {
 
    await mongoose.connection.close();
})
 
describe("User registration test", () => {
    //    insert testing
    it('Register User', () => {
        const user = {
            'name': 'Michael Scott',           
            'address': 'Bhaktapur',
            'phone': '98111000001',
            'email': "micahel1@gmail.com",
            'username': "michael",
            'password': '123456'
        };
        return User.create(user)
            .then((res) => {
                expect(res.username).toEqual('michael');
            })
    })
    it('Update', async () => {
        const reg = {
            'username': 'Dwight'
        };
        const status = await User.updateOne({ _id: Object('60766e3ae1bf0a46b4f0be3a') },
            { $set: reg });
        expect(status.ok).toBe(1);
    });
 
    it("Add Product", () => {
        const product = {
            pname: "Saxophone",
            pprice: 50000,
            pdesc: "This is saxophone",
            pimage: "myImg.jpg",
            prating:"3"
            
        }
 
        return Product.create(product).then((res) => {
            expect(res.pname).toEqual("Saxophone")
        })
 
    })
    it("Update Product", async () => {
        const status = await Product.updateOne({
            "_id": "607ef00d6fe8bf20148132c2"
        }, { $set: { "pprice": 16000 } });
 
        expect(status.ok).toBe(1)
 
    })
    it("Delete Product", async () => {
        const status = await Product.deleteOne({ id: "607ef00d6fe8bf20148132c2" })
 
        expect(status.ok).toBe(1)
    })
    it("Book Product", () => {
        const bookingRecord = {
            "user_id": "607c2f2ab7051523687603fe",
            "product_id": "607ef0f06fe8bf20148132c3",
            "quantity": 1,
            "price": 12000,
            "booked_At": "2021-04-16",
            
        }
 
        return Booking.create(bookingRecord).then((res) => {
            expect(res.quantity).toEqual(1)
        })
    })
    it("Update Booking", async () => {
        let status = await Booking.updateOne({
            "_id": "6079a08787e0b21b7cc383f0"
        }, {
            $set: { "quantity": 2 }
        })
 
        expect(status.ok).toBe(1);
    })
    it("Delete Booking", async () => {
        let status = await Booking.deleteOne({
            "_id": "6079a08787e0b21b7cc383f0"
        })
 
        expect(status.ok).toBe(1)
    })




 
})