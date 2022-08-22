const Product = require('../models/products')
const mongoose = require('mongoose')

//Fashion CRUD
module.exports.getfashion = (req, res)=>{
    res.json("inside getfashion controllers")
}
module.exports.addfashion = (req, res)=>{
    res.json("inside addfashion product controllers")
}
module.exports.updatefashion = (req, res)=>{
   res.json("inside updatefashion product controllers")
}
   module.exports.deletefashion = (req, res)=>{
    res.json("inside deletefashion product controllers")
}

//Grocery CRUD
module.exports.getgroceries = (req, res)=>{
    res.json("inside getgroceries controllers")
   }
   module.exports.updategrocery = (req, res)=>{
    res.json("inside updategrocery controllers")
   }
   module.exports.deletegrocery = (req, res)=>{
    res.json("inside deletegrocery controllers")
   }
   module.exports.addgrocery = (req, res)=>{
    res.json("inside addgrocery controllers")
   }

//electronics CRUD
module.exports.getelectronics = (req, res)=>{
   res.json("inside getelectronics controllers")
    }
module.exports.addelectronic = (req, res)=>{
    res.json("inside addelectronic controllers")
    }
module.exports.deleteelectronic = (req, res)=>{
   res.json("inside deleteelectronic controllers")
    }
module.exports.updateelectronic = (req, res)=>{
   res.json("inside updateelectronic controllers")
}

//Cosmetics CRUD
module.exports.getcosmetics = (req, res)=>{
    res.json("inside getcosmetics controllers")
}            
module.exports.addcosmetic = (req, res)=>{
    res.json("inside addcosmetic controllers")
}
module.exports.updatecosmetic = (req, res)=>{
    res.json("inside updatecosmetic controllers")
}
module.exports.deletecosmetic = (req, res)=>{
    res.json("inside deletecosmetic controllers")
}
module.exports.getProducts = async (req,res) =>{
   try {
        const products  =  await Product.find({ });
        res.json(products)
        // console.log(products);
    
   } catch (error) {
    console.log(error);
   }
};

module.exports.getProduct = async (req,res) =>{
    console.log(req.params);

    try {
         const product  =  await Product.findOne({ 'id': req.params.id });
         res.json(product)
        //  
    } catch (error) {
     console.log(error);
       

    }
   
 };
 