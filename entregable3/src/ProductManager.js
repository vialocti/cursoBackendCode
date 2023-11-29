import { Console } from 'console'
import  fs  from 'fs'

export class ProductManager{
    constructor(path){
        this.path=path
    }

     static id=0

    //traer productos
     async getProducts(){

        try {
            const datos= await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(datos)
        } catch (error) {
            await fs.promises.writeFile(this.path,JSON.stringify([]),'utf-8')
            return []
        }
    
    }


    //buscar producto por id
    async getProductById(productById){
        
        let productos =JSON.parse( await fs.promises.readFile(this.path,'utf-8'))

        let producto= productos.find(elemento => elemento.id ===parseInt(productById))
        //console.log(producto)
        return producto

    }

    async addProduct(products, productAdd){

        
        if(!productAdd.title || !productAdd.description || !productAdd.price || !productAdd.thumbnail || !productAdd.code || !productAdd.stock){
            return console.log('datos faltantes')
        }
        ProductManager.id++
        productAdd.id=ProductManager.id
        products.push(productAdd)
        await fs.promises.writeFile(this.path,JSON.stringify(products))


    }


    async updateProductById(productById, Newdatos){
        
        try {
            const productos = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
            const Newproducto= productos.filter(elemento=>elemento.id !== productById)
        //agregamos el Newdatos
            Newproducto.push(Newdatos)
        //reescribimos arhivo
            await fs.promises.writeFile(this.path, JSON.stringify(Newproducto),'utf-8')
        } catch (error) {
            console.log(error)
        }
        

    }


    async deleteProductById(productById){

        let productos =JSON.parse(await fs.promises.readFile(this.path,'utf-8'))

        let productosact= productos.filter(elemento => elemento.id !==productById)
        await fs.promises.writeFile(this.path,JSON.stringify(productosact))

    }
}
