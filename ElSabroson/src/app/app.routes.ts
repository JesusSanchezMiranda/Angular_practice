import { Routes } from '@angular/router';
import { UsersListComponent } from './feature/users/users-list/users-list.component';
import { ProductsListComponent } from './feature/products/products-list/products-list.component';
import { SaleListComponent } from './feature/sale/sale-list/sale-list.component';
import { DashboardListComponent } from './feature/dashboard/dashboard-list/dashboard-list.component';
import { KitchenListComponent } from './feature/kitchen/kitchen-list/kitchen-list.component';
import { BoxListComponent } from './feature/box/box-list/box-list.component';
import { ReservationsListComponent } from './feature/reservations/reservations-list/reservations-list.component';
import { ReportsListComponent } from './feature/reports/reports-list/reports-list.component';

export const routes: Routes = [

    { 
        path: "dashboard",
        component: DashboardListComponent
    },

    {
        path: "kitchen",
        component: KitchenListComponent
    },

    {
        path: "products",
        component: ProductsListComponent
    },

    {
        path: "sale",
        component: SaleListComponent
    },

    {
        path: "box",
        component: BoxListComponent
    },

    {
        path: "reservations",
        component: ReservationsListComponent
    },

    {
        path: "users",
        component: UsersListComponent 
    },

    {
        path: "reports",
        component: ReportsListComponent
    },

    {
        path: "",

        pathMatch: "full",

        redirectTo: "dashboard",
    }


];
