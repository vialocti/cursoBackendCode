//propiedades de producto: title, description,price, thumbnail, code, stock

//metodos addProduct, getProducts, getProductById, deleteProductById

//clase de administrcion de productos
class ProductManager {
    
    
    constructor(){
        this.products=[]
    }
    
    static id=0
    getProductById =(productId)=>{
        const producto = this.products.find(product=>product.id===productId)
        return producto
    }

    deleteProductoById=(productId)=>{
        this.products = this.products.filter(product=>product.id!==productId)
        return this.products  
    }

    #verificarCode =(code)=>{
        //console.log(code)
        if(this.products.length>0){
        return this.products.find(producto=> producto.code===code)
        }else{
            return false
        }
    }

    addProduct = (title, description,price,thumbnail,code,stock)=>{
        
        if(title && description && price && thumbnail && code && stock){
        
            if(!this.#verificarCode(code)){
            ProductManager.id++
            
            let product={
                id:ProductManager.id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock

            }
            //console.log(product)
            this.products.push(product)
        }else{ console.log('El code ya existe ')}
    }else{
        console.log('Faltan Datos o Los Datos son invalidos')
    }
    }

    getProducts =()=>{
        return this.products
    }
}


const producto1 = new ProductManager()

//caso prueba ingresamos tres valores
producto1.addProduct('manteca Ilolay200','Paquete por 200 gr',980,'./imagenes/mantecailolay2.jpg','L0210',2000)
producto1.addProduct('manteca Ilolay100','Paquete por 100 gr',480,'./imagenes/mantecailolay1.jpg','L0211',3000)
producto1.addProduct('margarina','Paquete por 150 gr',180,'./imagenes/marge1.jpg','L0212',400)
console.log('Listado Productos Ingresados')
console.log(producto1.getProducts())//mostramos los productos ingresados
console.log('')
console.log('____________________________')
console.log('Buscar Un producto que Existe')

console.log(producto1.getProductById(3)??'NO Existe el Producto con ese Id') 
console.log('nos muestra el producto ')
console.log('______________________________')
console.log('buscar un Producto que No Existe')
console.log('Nos muestra el msg')
console.log(producto1.getProductById(6)??'NO Existe el Producto con ese Id') 

console.log('')
console.log('Agregar un producto con code existente')
producto1.addProduct('Queso pastor','Paquete 1 kg',1180,'./imagenes/queso.jpg','L0211',400)
console.log('')

console.log('Agregar productos con valores faltantes o invalidos')
console.log('caso 1: falta uno o mas argumento en la funcion')
producto1.addProduct('Paquete por 150 gr',180,'./imagenes/marge1.jpg','L0211',400)
console.log('caso 2:valores no validos 0 o vacios')
console.log('primer argumento vacio')
producto1.addProduct('','Paquete por 150 gr',10,'./imagenes/marge1.jpg','L09876',400)
console.log('precio 0')
producto1.addProduct('Velas','Paquete por 12 ',0,'./imagenes/marge1.jpg','L09876',400)
console.log('_______________________________')
console.log('eleminamos un producto y retornamos todos los productos')
console.log(producto1.deleteProductoById(2))

