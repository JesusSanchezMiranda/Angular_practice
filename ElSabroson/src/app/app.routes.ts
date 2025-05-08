import { Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { KitchenComponent } from './feature/kitchen/kitchen.component';
import { ProductsComponent } from './feature/products/products.component';
import { SaleComponent } from './feature/sale/sale.component';
import { BoxComponent } from './feature/box/box.component';
import { ReservationsComponent } from './feature/reservations/reservations.component';
import { UsersComponent } from './feature/users/users.component';
import { ReportsComponent } from './feature/reports/reports.component';

export const routes: Routes = [

    { 
        path: "dashboard",
        component: DashboardComponent
    },

    {
        path: "kitchen",
        component: KitchenComponent
    },

    {
        path: "products",
        component: ProductsComponent
    },

    {
        path: "sale",
        component: SaleComponent
    },

    {
        path: "box",
        component: BoxComponent
    },

    {
        path: "reservations",
        component: ReservationsComponent
    },

    {
        path: "users",
        component: UsersComponent
    },

    {
        path: "reports",
        component: ReportsComponent
    },

    {
        path: "",

        pathMatch: "full",

        redirectTo: "dashboard",
    }


];
