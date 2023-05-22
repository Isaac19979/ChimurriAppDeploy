import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Proveedores } from 'app/models/proveedores.model'


@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  selectedProveedor: Proveedores;
  proveedores: Proveedores[];
  readonly baseUrl= 'http://localhost:4000/proveedor'

  constructor(private http: HttpClient) { }

  postProveedores(prov : Proveedores){
    return this.http.post(this.baseUrl, prov);
  }
  getProveedores() {
    return this.http.get(this.baseUrl+"/list");
  }
  putProveedor(prov: Proveedores) {
    return this.http.put(this.baseUrl + `/${prov._id}`, prov);
  }
  deleteProveedores(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }

}