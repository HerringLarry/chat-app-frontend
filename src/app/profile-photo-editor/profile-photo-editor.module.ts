import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { ProfilePhotoEditorComponent } from './profile-photo-editor.component';
import { ProfilePhotoEditorRoutingModule } from './profile-photo-editor-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule, SharedModule, ProfilePhotoEditorRoutingModule, ImageCropperModule,
  ],
  declarations: [
    ProfilePhotoEditorComponent,
  ],
  exports: [
    ProfilePhotoEditorComponent,
  ]
})
export class ProfilePhotoEditorModule { }
