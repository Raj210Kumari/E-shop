const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    "name":String,
    "discreption":String,
    "price":Number,
    "rating":Number,
    "image":String,
    "category":String,
    "stock":Number,
})

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}