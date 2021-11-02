import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import users from './data/user.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id;
        const sampleProduct = products.map((product) => {
            return { ...product, user: adminUser };
        })
        await Product.insertMany(sampleProduct);
        console.log("data imported!!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyedData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();



        console.log("data destroyed!!".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyedData();
}
else {
    importData();
}