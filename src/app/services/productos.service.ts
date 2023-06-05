import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from 'app/models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  selectedProductos: Productos;
  Productos: Productos[];
  readonly baseUrl= 'https://backend-chimurriapp/productos'

  constructor(private http: HttpClient) { }

  postProductos(prod : Productos) {
    return this.http.post(this.baseUrl, prod);
  }

  getProductos() {
    return this.http.get(this.baseUrl+"/list");
  }

  putProductos(prod: Productos) {
    return this.http.put(this.baseUrl + `/${prod._id}`, prod);
  }

  deleteProductos(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
}




