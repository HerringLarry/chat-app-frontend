import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePhotoEditorComponent } from './profile-photo-editor.component';

const routes: Routes = [
    {
        path: '',
        component: ProfilePhotoEditorComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePhotoEditorRoutingModule { }
