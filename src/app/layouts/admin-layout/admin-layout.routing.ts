import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MapsComponent } from '../../maps/maps.component';
import { EmpleadosComponent } from '../../empleados/empleados.component';
import { ClientesComponent } from '../../clientes/clientes.component';
import { ProveedoresComponent } from '../../proveedores/proveedores.component';
import { EmpleadosAddComponent } from 'app/empleados-add/empleados-add.component';
import { CalculosComponent } from 'app/calculos/calculos.component';
import { ClientesAddComponent} from 'app/clientes-add/clientes-add.component';
import { ProductosComponent } from 'app/productos/productos.component';
import { ProductosAddComponent } from 'app/productos-add/productos-add.component';
import { ProveedoresAddComponent } from 'app/proveedores-add/proveedores-add.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'empleados', component: EmpleadosComponent },
    { path: 'empleados-add', component: EmpleadosAddComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    {path: 'clientes-add', component: ClientesAddComponent},
    {path: 'proveedores-add', component: ProveedoresAddComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'productos-add', component: ProductosAddComponent},
    { path: 'calculos',        component: CalculosComponent },
];
