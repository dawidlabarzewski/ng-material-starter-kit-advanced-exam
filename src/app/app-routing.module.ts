import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvancedListComponent } from './components/advanced-list/advanced-list.component';
import { AdvancedListComponentModule } from './components/advanced-list/advanced-list.component-module';
import { CategoryServiceModule } from './services/category.service-module';
import { ProductServiceModule } from './services/product.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'advanced-list', component: AdvancedListComponent }]), AdvancedListComponentModule, CategoryServiceModule, ProductServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
