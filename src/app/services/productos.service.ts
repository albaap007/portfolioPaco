import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Producto} from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarproductos();

   }

  private cargarproductos(){

    this.http.get('https://angulal-html-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
              .subscribe( (resp : any )=> {

                console.log(resp);
                this.productos = resp;
                setTimeout(() => {
                  this.cargando= false;
                },1500);

              });

  }
}
