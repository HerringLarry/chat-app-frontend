import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../common/shared.module';
import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatButtonToggleModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, SettingsRoutingModule, SharedModule,
    MatCheckboxModule, MatButtonModule, MatButtonToggleModule, FormsModule, MatIconModule,
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent,
  ]
})
export class SettingsModule { }
