import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedores } from '../models/proveedores.model';
import { NgModule } from '@angular/core';
import { ProveedoresService } from 'app/services/proveedores.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
    selector: 'app-proveedores',
    templateUrl: './proveedores-add.component.html',
    styleUrls: ['./proveedores-add.component.scss'],
})
export class ProveedoresAddComponent implements OnInit {
    constructor(
        public proveedorServicio: ProveedoresService,
        private router: Router
    ) { }

    ngOnInit() {
        this.resetForm();
        this.refrescarProveedores();
    }

    resetForm(form?: NgForm) {
        if (form) form.reset();
        this.proveedorServicio.selectedProveedor = {
            _id: '',
            Cedula: '',
            Nombre: '',
            Apellidos: '',
            producto: "",
            fechaIngreso: null,
            editing: false,
        };
    }

    onSubmit(form: NgForm) {
        if (!form.value._id) {
            this.proveedorServicio.postProveedores(form.value).subscribe((res) => {
                this.resetForm(form);
                this.refrescarProveedores();
                M.toast({ html: 'Guardado correctamente', classes: 'rounded' });
            });
        } else {
            M.toast({ html: 'Hubo un error al registrar', classes: 'rounded' });
        }
    }


    refrescarProveedores() {
        this.proveedorServicio.getProveedores().subscribe((res) => {
            this.proveedorServicio.proveedores = res as Proveedores[];
        });
    }

    goToPage() {
        this.router.navigate(['/proveedores']);
    }
}






