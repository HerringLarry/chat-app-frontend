import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../common/shared.module';
import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatButtonToggleModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifiedButtonComponent } from './modified-button/modified-button.component';

@NgModule({
  imports: [
    CommonModule, SettingsRoutingModule, SharedModule,
    MatCheckboxModule, MatButtonModule, MatButtonToggleModule, FormsModule, MatIconModule, MatSnackBarModule,
  ],
  declarations: [
    SettingsComponent,
    ModifiedButtonComponent
  ],
  exports: [
    SettingsComponent,
  ]
})
export class SettingsModule { }
