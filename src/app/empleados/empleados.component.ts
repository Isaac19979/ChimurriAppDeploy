import { Component, } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Empleados } from '../models/empleados.model';
import { NgModule } from '@angular/core';
import { EmpleadosService } from 'app/services/empleados.service';
import { Router } from '@angular/router';

import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2';

declare var M: any;


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [EmpleadosService]
})


export class EmpleadosComponent {

  constructor(
    public empleadoServicio: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm();
    this.refrescarEmpleados();
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.empleadoServicio.selectedEmpleado = {
      _id: "",
      Nombre: "",
      Apellidos: "",
      Cedula: "",
      Nacionalidad: "",
      FechaNacimiento: null,
      editing: false,
    }
  }


  exportExcel(): void {
    this.empleadoServicio.getEmpleados().subscribe(data => {
      console.log(data)
      const sheetName = 'Sheet1';
      const worksheet = XLSX.utils.json_to_sheet(Object.values(data), {});
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(excelBlob, 'Empleados Chimurria.xlsx');
    });
  }

  refrescarEmpleados() {
    this.empleadoServicio.getEmpleados().subscribe((res) => {
      this.empleadoServicio.empleados = res as Empleados[];
    });
  }


  Eliminar(_id: string, form: NgForm) {
    Swal.fire({
      title: 'Advertencia',
      text: "¿Esta seguro de querer eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoServicio.deleteEmpleados(_id).subscribe((res) => {
          this.refrescarEmpleados();
          this.resetForm(form);
          M.toast({ html: 'Eliminado correctamente', classes: 'rounded' });
        })
      }
    })
  }

  editarEmpleado(emp: Empleados) {
    emp.editing = true;
  }

  guardarEmpleado(emp: Empleados) {
    // Actualizar el empleado en el servicio
    this.empleadoServicio.putEmpleado(emp).subscribe(
      (res) => {
        // Restablecer el modo de edición y refrescar la lista de empleados
        emp.editing = false;
        this.refrescarEmpleados();
        M.toast({ html: 'Empleado actualizado correctamente', classes: 'rounded' });
      },
      (error) => {
        console.error(error);
        M.toast({ html: 'Error al actualizar el empleado', classes: 'rounded' });
      }
    );
  }

  cancelarEdicion(emp: Empleados) {
    emp.editing = false;
    this.resetForm();
  }

  goToPage() {
    this.router.navigate(['/empleados-add']);
  }
  
}