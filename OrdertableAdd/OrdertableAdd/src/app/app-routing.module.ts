import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import { OrderComponent } from './component/order/order.component';
 import { BillComponent } from './component/bill/bill.component';
import { HomeComponent } from './component/home/home.component';
import { InvoiceComponent } from './component/order/invoice/invoice.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[RoleGuard]},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'product',component:ProductComponent,canActivate:[AuthGuard]},
  {path:'contact-us',component:ContactComponent,canActivate:[AuthGuard]},
  {path:'about-us',component:AboutComponent,canActivate:[AuthGuard]},
  {path:'order',component:OrderComponent,
  children:[
    {
      path:'invoice',component:InvoiceComponent,canActivate:[AuthGuard]
    }
  ]
},
  {path:'home',component:HomeComponent},
  {path: 'bill',component:BillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
