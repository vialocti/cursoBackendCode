import express from 'express'
import { ProductManager } from './ProductManager.js'


const PORT = 8080
const app=express()
//
app.use(express.urlencoded({extended:true}))
//rutas


//todos los productos o una parte informado por el limit
app.get('/products',async(req,res)=>{

    

    let limit = req.query.limit

    const PManager = new ProductManager('./src/products.json')
   try {
    if(!limit){
        return res.send(await PManager.getProducts())
    }
    let arraylimit=[]
    const allproducts = await PManager.getProducts()
    
    for(let i=0; i<limit ; i++){
        arraylimit.push(allproducts[i])
    }
    res.send(arraylimit)
   } catch (error) {
    return res.send({"error":"se ha producido un error"})
   }
    

})

//consultar producto por id
app.get('/product/:pid',async(req,res)=>{
    
    const { pid }=req.params
    
    const PManager = new ProductManager('./src/products.json')
    
    try {
        const producto = await PManager.getProductById(pid)
        if(!producto){
            return res.send({"aviso":"No existe el Producto Seleccionado"})
        }
        res.send(producto)
    
    } catch (error) {
    
        return res.send({"error":"se ha producido un error"})
    }


})



app.listen(PORT, ()=>{
    console.log(`server running in port ${PORT}`)
})