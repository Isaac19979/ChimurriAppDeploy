import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Productos } from '../models/productos.model';
import { NgModule } from '@angular/core';
import { ProductosService } from 'app/services/productos.service';
import { Router } from '@angular/router';

import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2';

declare var M: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})

export class ProductosComponent {

  constructor(
    public productosServicio: ProductosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm();
    this.refrescarProductos();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.productosServicio.selectedProductos = {
      _id: "",
      Nombre: "",
      fechaIngreso: null,
      detalles: "",
      Cantidad: null,
      editing: false,
    }
  }

  exportExcel(): void {
    this.productosServicio.getProductos().subscribe(data => {
      console.log(data)
      const sheetName = 'Sheet1';
      const worksheet = XLSX.utils.json_to_sheet(Object.values(data), {});
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(excelBlob, 'productos.xlsx');
    });
  }

  refrescarProductos() {
    this.productosServicio.getProductos().subscribe((res) => {
      this.productosServicio.Productos = res as Productos[];
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
        this.productosServicio.deleteProductos(_id).subscribe((res) => {
          this.refrescarProductos();
          this.resetForm(form);
          M.toast({ html: 'Eliminado correctamente', classes: 'rounded' });
        })
      }
    })
  }

  editarProducto(prod: Productos) {
    prod.editing = true;
  }

  guardarProducto(prod: Productos) {
    this.productosServicio.putProductos(prod).subscribe(
      (res) => {
        prod.editing = false;
        this.refrescarProductos();
        M.toast({ html: 'Producto actualizado correctamente', classes: 'rounded' });
      },
      (error) => {
        console.error(error);
        M.toast({ html: 'Error al actualizar el producto', classes: 'rounded' });
      }
    );
  }

  cancelarEdicion(prod: Productos) {
    prod.editing = false;
    this.resetForm();
  }

  goToPage() {
    this.router.navigate(['/productos-add']);
  }
}


