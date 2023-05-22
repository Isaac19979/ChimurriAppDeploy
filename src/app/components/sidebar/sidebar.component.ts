import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../auth/interfaces/interfaces';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Inicio',  icon: 'dashboard', class: '' },
    { path: '/empleados', title: 'Empleados',  icon:'group', class: '' },
    { path: '/productos', title: 'Productos',  icon:'receipt_long', class: '' },
    { path: '/clientes', title: 'Clientes',  icon:'person', class: '' },
    { path: '/proveedores', title: 'Proveedores',  icon:'contacts', class: '' },
    { path: '/calculos', title: 'Calculos',  icon:'calculate', class: '' },
    { path: '/logout', title: 'Cerrar Sesión', icon:'logout', class:'' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  get usuario(){
    return this.authService.usuario;
  }

  logout(){

    this.router.navigateByUrl('/auth');
    this.authService.logout();

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
               private authService: AuthService) {
                this.logout = this.logout.bind(this);
               }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
