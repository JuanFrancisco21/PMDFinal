import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddworkPageRoutingModule } from './addwork-routing.module';

import { AddworkPage } from './addwork.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddworkPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddworkPage]
})
export class AddworkPageModule {}
