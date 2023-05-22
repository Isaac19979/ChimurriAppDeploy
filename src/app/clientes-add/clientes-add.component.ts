import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clientes } from '../models/clientes.model';
import { NgModule } from '@angular/core';
import { ClientesService } from 'app/services/clientes.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes-add.component.html',
    styleUrls: ['./clientes-add.component.scss'],
    providers: [ClientesService]
})
export class ClientesAddComponent {
    constructor(public clienteServicio: ClientesService, private router: Router) { }

    ngOnInit() {
        this.resetForm();
        this.refrescarClientes();
    }

    resetForm(form?: NgForm) {
        if (form) {
            form.reset();
        }
        this.clienteServicio.selectedCliente = {
            _id: "",
            Nombre: "",
            Apellidos: "",
            Cedula: "",
            Cantidad: null,
            fechaIngreso: null,
            editing: false,
        }
    }

    onSubmit(form: NgForm) {
        if (!form.value._id) {
            this.clienteServicio.postCliente(form.value).subscribe((res) => {
                this.resetForm(form);
                this.refrescarClientes();
                M.toast({ html: 'Guardado correctamente', classes: 'rounded' });
            });
        }
        else {
            M.toast({ html: 'Hubo un error al registrar', classes: 'rounded' });
        }
    }

    refrescarClientes() {
        this.clienteServicio.getClientes().subscribe((res) => {
            this.clienteServicio.clientes = res as Clientes[];
        });
    }

    goToPage() {
        this.router.navigate(['/clientes']);
    }
}