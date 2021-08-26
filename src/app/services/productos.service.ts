import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Producto} from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarproductos();

   }

  private cargarproductos(){

    return new Promise<void>((resolve, reject) => {

      this.http.get('https://angulal-html-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
              .subscribe( (resp : any )=> {
                this.productos = resp;
                this.cargando= false;
                resolve();
           

              });

    });

      
    }

    getProducto(id:string) {
     return this.http.get(`https://angulal-html-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
  
    }

    buscarProducto(termino: string){

      if(this.productos.length == 0){
        //cargar productos
        this.cargarproductos().then( () =>{ 
          // ejecutar después de tener los productos
          //Aplicar filtro
          this.filtrarProductos(termino);
        });
      } else {
        //aplicar filtro
        this.filtrarProductos(termino);
      }
/**
     this.productosFiltrado = this.productos.filter(producto =>{
        return true;
      });

      console.log(this.productosFiltrado);
*/
    }

    private filtrarProductos( termino: string){

      this.productosFiltrado = [];
      termino = termino.toLocaleLowerCase();

      this.productos.forEach(prod =>{

        const tituloLower = prod.titulo?.toLocaleLowerCase();

        if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
          this.productosFiltrado.push(prod);
        }



      });

    }

  }

 

