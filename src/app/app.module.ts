import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadosAddComponent } from './empleados-add/empleados-add.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';
import { ProveedoresAddComponent } from './proveedores-add/proveedores-add.component';
import { CalculosComponent } from './calculos/calculos.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosAddComponent} from './productos-add/productos-add.component';
import { AuthService } from './auth/services/auth.service';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ClientesComponent,
    ProveedoresComponent,
    EmpleadosComponent,
    EmpleadosAddComponent,
    ClientesAddComponent,
    ProveedoresAddComponent,
    CalculosComponent,
    ProductosAddComponent,
    ProductosComponent
   
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
