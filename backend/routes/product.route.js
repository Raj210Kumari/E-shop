const express=require("express")
require("dotenv").config()

const {ProductModel}=require("../models/product.model")

const productRoute=express.Router()

productRoute.get("/",async(req,res)=>{
    const new_product= await ProductModel.find()
    res.send(new_product)
})

productRoute.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        const new_product= new ProductModel(payload)
        await new_product.save()
        res.send("Created the product")
    } catch (err) {
        console.log("err")
        res.send("ERROR : Something went worng")
        
    }
})

productRoute.patch("/update/:id", async (req,res) => {
    const payload = req.body;
    const id = req.params.id;
    const product= await ProductModel.findOne({"_id":id})
    const userID_in_product=product.userID
    const userID_making_req=req.body.userID
    try {
        // if('userId who is making request'=="userId in that particular doc")
        if(userID_making_req!==userID_in_product){
            res.send({"msg":"your are not authorized"})
        }else{
            await ProductModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the product")
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
   
})

productRoute.delete("/delete/:id", async (req,res) => {
    const payload = req.body;
    const id = req.params.id;
    const product= await ProductModel.findOne({"_id":id})
    const userID_in_product=product.userID
    const userID_making_req=req.body.userID
    try {
        // if('userId who is making request'=="userId in that particular doc")
        if(userID_making_req!==userID_in_product){
            res.send({"msg":"your are not authorized"})
        }else{
            await ProductModel.findByIdAndDelete({"_id":id},payload)
            res.send("Delete the Product")
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
})


module.exports={
    productRoute
}