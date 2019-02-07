import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { ProfileEditorComponent } from './profile-editor.component';
import { ProfileEditorRoutingModule } from './profile-photo-editor-routing.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, ProfileEditorRoutingModule,
  ],
  declarations: [
    ProfileEditorComponent,
  ],
  exports: [
    ProfileEditorComponent
  ]

})
export class ProfileEditorModule { }
