import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, RegistrationRoutingModule, MatFormFieldModule, MatOptionModule, MatInputModule, MatSelectModule,
    MatButtonModule, ReactiveFormsModule,
  ],
  declarations: [
    RegistrationComponent,
    RegistrationFormComponent,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class RegistrationModule {}
