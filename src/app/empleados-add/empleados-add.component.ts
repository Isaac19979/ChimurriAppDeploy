import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empleados } from '../models/empleados.model';
import { NgModule } from '@angular/core';
import { EmpleadosService } from 'app/services/empleados.service';
import { Router} from '@angular/router';


declare var M: any;

@Component({
  selector: 'app-empleados-add',
  templateUrl: './empleados-add.component.html',
  styleUrls: ['./empleados-add.component.scss']
})

export class EmpleadosAddComponent implements OnInit {

  constructor(
    public empleadoServicio: EmpleadosService, 
    private router: Router
  ){}

  ngOnInit(){
    this.resetForm();
    this.refrescarEmpleados();
  }


  resetForm(form?: NgForm){
    if (form)
    form.reset();
    this.empleadoServicio.selectedEmpleado ={
      _id:"",
      Nombre:"",
      Apellidos:"",
      Cedula:"",
      Nacionalidad:"",
      FechaNacimiento:null,
      editing: false,
    }
  }
  

  onSubmit(form: NgForm){
    if(!form.value._id){
    this.empleadoServicio.postEmpleado(form.value).subscribe((res)=> {
      this.resetForm(form);
      this.refrescarEmpleados();
      M.toast({ html: 'Guardado correctamente', classes: 'rounded' });
    });
  }
  else{
      M.toast({ html: 'Hubo un error al registrar', classes: 'rounded' });
  }
}

  refrescarEmpleados() {
    this.empleadoServicio.getEmpleados().subscribe((res) => {
      this.empleadoServicio.empleados = res as Empleados[];
    });
  }


  goToPage(){
    this.router.navigate(['/empleados']);
  }
}