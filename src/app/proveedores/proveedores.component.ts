import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedores } from '../models/proveedores.model';
import { NgModule } from '@angular/core';
import { ProveedoresService } from 'app/services/proveedores.service';
import { Router } from '@angular/router';

import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2';

declare var M: any;

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
  providers: [ProveedoresService]
})

export class ProveedoresComponent {

  constructor(public proveedorServicio: ProveedoresService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.refrescarProveedors();
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.proveedorServicio.selectedProveedor = {
      _id: "",
      Nombre: "",
      Apellidos: "",
      Cedula: "",
      producto: "",
      fechaIngreso: null,
      editing: false,
    }
  }

  exportExcel(): void {
    this.proveedorServicio.getProveedores().subscribe(data => {
      if (data && Object.keys(data).length > 0){
      console.log(data)
      const sheetName = 'Sheet1';
      const worksheet = XLSX.utils.json_to_sheet(Object.values(data), {});
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(excelBlob, 'proveedores.xlsx');
      } else{
        Swal.fire({
          title:'No existen datos',
          icon: 'error',
        })
      }
    });
  }

  refrescarProveedors() {
    this.proveedorServicio.getProveedores().subscribe((res) => {
      this.proveedorServicio.proveedores = res as Proveedores[];
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
        this.proveedorServicio.deleteProveedores(_id).subscribe((res) => {
          this.refrescarProveedors();
          this.resetForm(form);
          M.toast({ html: 'Eliminado correctamente', classes: 'rounded' });
        })
      }
    })
  }

  editarProveedor(prov: Proveedores) {
    prov.editing = true;
  }

  guardarProveedor(prov: Proveedores) {
    this.proveedorServicio.putProveedor(prov).subscribe(
      (res) => {
        prov.editing = false;
        this.refrescarProveedors();
        M.toast({ html: 'Proveedor actualizado correctamente', classes: 'rounded' });
      },
      (error) => {
        console.error(error);
        M.toast({ html: 'Error al actualizar el proveedor', classes: 'rounded' });
      }
    );
  }

  cancelarEdicion(prov: Proveedores) {
    prov.editing = false;
    this.resetForm();
  }

  goToPage() {
    this.router.navigate(['/proveedores-add']);
  }
}


