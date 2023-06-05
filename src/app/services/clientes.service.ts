import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';


import { Clientes } from 'app/models/clientes.model'


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  selectedCliente: Clientes;
  clientes: Clientes[];
  readonly baseUrl= 'https://backend-chimurriapp/clientes'

  constructor(private http: HttpClient) { }

  postCliente(cl : Clientes){
    return this.http.post(this.baseUrl, cl);
  }
  getClientes() {
    return this.http.get(this.baseUrl+"/list");
  }
  putCliente(cl: Clientes) {
    return this.http.put(this.baseUrl + `/${cl._id}`, cl);
  }
  deleteClientes(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }

}
