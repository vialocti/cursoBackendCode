//funciones agregar, modificar,eliminar y consultar productos

const fs = require('fs')

class ProductManager{
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

        let producto= productos.find(elemento => elemento.id ===productById)
        console.log(producto)

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

//productos de prueba para agregar
const pr1={
    title:'Malbec Argentino, Catena Zapata',
    description:'Vino de guarda malbec 99 puntos premio NY ',
    price:6000,
    thumbnail:'./imafenes/malbecArCZ.jpg',
    code:'MBCZ0001',
    stock:2000

}

const pr2={
    title:'Los Intocables Trapiche wines',
    description:'Vino reserva Cabernet frant 98 puntos NY ',
    price:4000,
    thumbnail:'./imafenes/cabernetLosIntocables.jpg',
    code:'CBTR0001',
    stock:3000

}

const pr3={
    title:'Font de Cav Merlot',
    description:'Vino Merlot 96 puntos premio NY ',
    price:3500,
    thumbnail:'./imafenes/merlotFDC.jpg',
    code:'METR0002',
    stock:22000

}

const pr4={
    title:'El Enemigo Cabernet Sauvignon',
    description:'Vino De guarda Cabernet Sauvignon 100 pts London 2023 ',
    price:10000,
    thumbnail:'./imafenes/cabernetElenemigo.jpg',
    code:'CBCZ0003',
    stock:1000

}





const PM1= new ProductManager('./productos.json')

const cargarProductos =async()=>{

  let productos = await PM1.getProducts()
  await PM1.addProduct(productos, pr1)
  await PM1.addProduct(productos, pr2)
  await PM1.addProduct(productos, pr3)
  await PM1.addProduct(productos, pr4)
  console.log(await PM1.getProducts())

}

const mostrarProducto= async (id)=>{
    await PM1.getProductById(id)
}


const eliminarProducto =async (id)=>{
    await PM1.deleteProductById(id)
}

const modificarProducto=async(id,datos)=>{
    await PM1.updateProductById(id,datos)

}

//cargarProductos()

//mostrarProducto(3)
//eliminarProducto(1)

//ejemplo de modificar enviando objeto completo

datosmodi={
    title:'Alma Mora merlot',
    description:'Merlot de altura valle del pedernal 98 puntos premio NY ',
    price:3500,
    thumbnail:'./imafenes/merlotFDC.jpg',
    code:'METR0002',
    stock:11000,
    id:3
}
modificarProducto(3, datosmodi)