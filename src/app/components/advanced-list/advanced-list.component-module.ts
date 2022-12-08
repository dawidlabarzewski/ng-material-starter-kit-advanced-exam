import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout/flex';
import { AdvancedListComponent } from './advanced-list.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [MatCardModule, MatListModule, FlexModule, CommonModule, MatButtonModule],
  declarations: [AdvancedListComponent],
  providers: [],
  exports: [AdvancedListComponent]
})
export class AdvancedListComponentModule {
}
