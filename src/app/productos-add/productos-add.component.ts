import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Productos } from '../models/productos.model';
import { NgModule } from '@angular/core';
import { ProductosService } from 'app/services/productos.service';
import { Router } from '@angular/router';

import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

declare var M: any;

@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styleUrls: ['./productos-add.component.css'],
  providers: [ProductosService]
})

export class ProductosAddComponent {

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

  onSubmit(form: NgForm) {
    if (!form.value._id) {
      this.productosServicio.postProductos(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarProductos();
        M.toast({ html: 'Guardado correctamente', classes: 'rounded' });
      });
    }
    else {
      M.toast({ html: 'Hubo un error al registrar', classes: 'rounded' });
    }
  }

  refrescarProductos() {
    this.productosServicio.getProductos().subscribe((res) => {
      this.productosServicio.Productos = res as Productos[];
    });
  }


  goToPage() {
    this.router.navigate(['/productos']);
  }
}

