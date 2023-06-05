import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleados } from 'app/models/empleados.model'


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  selectedEmpleado: Empleados;
  empleados: Empleados[];
  readonly baseUrl= 'https://backend-chimurriapp/empleados'

  constructor(private http: HttpClient) { }

  postEmpleado(emp : Empleados){
    return this.http.post(this.baseUrl, emp);
  }
  getEmpleados() {
    return this.http.get(this.baseUrl+"/list");
  }
  putEmpleado(emp: Empleados) {
    return this.http.put(this.baseUrl + `/${emp._id}`, emp);
  }
  deleteEmpleados(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }

}
