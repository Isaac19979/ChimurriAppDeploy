import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clientes } from '../models/clientes.model';
import { NgModule } from '@angular/core';
import { ClientesService } from 'app/services/clientes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2';

declare var M: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [ClientesService]
})
export class ClientesComponent implements OnInit {

  constructor(
    public clienteServicio: ClientesService,
    private router: Router,
    private _dialog: MatDialog,
    private _clService: ClientesService,
  ) { }

  ngOnInit() {
    this.resetForm();
    this.refrescarClientes();
  }


  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.clienteServicio.selectedCliente = {
      _id: "",
      Nombre: "",
      Cedula: "",
      Apellidos: "",
      fechaIngreso: null,
      Cantidad: 0,
      editing: false,
    }
  }


  refrescarClientes() {
    this.clienteServicio.getClientes().subscribe((res) => {
      this.clienteServicio.clientes = res as Clientes[];
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
        this.clienteServicio.deleteClientes(_id).subscribe((res) => {
          this.refrescarClientes();
          this.resetForm(form);
          M.toast({ html: 'Eliminado correctamente', classes: 'rounded' });
        })
      }
    })
  }

  exportExcel(): void {
    this.clienteServicio.getClientes().subscribe(data => {
      console.log(data)
      const sheetName = 'Sheet1';
      const worksheet = XLSX.utils.json_to_sheet(Object.values(data), {});
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(excelBlob, 'clientes.xlsx');
    });
  }

  editarCliente(cl: Clientes) {
    cl.editing = true;
  }

  guardarCliente(cl: Clientes) {
    this.clienteServicio.putCliente(cl).subscribe(
      (res) => {
        cl.editing = false;
        this.refrescarClientes();
        M.toast({ html: 'Cliente actualizado correctamente', classes: 'rounded' });
      },
      (error) => {
        console.error(error);
        M.toast({ html: 'Error al actualizar el cliente', classes: 'rounded' });
      }
    );
  }

  cancelarEdicion(cl: Clientes) {
    cl.editing = false;
    this.resetForm();
  }
  
  goToPage() {
    this.router.navigate(['/clientes-add']);
  }
}