import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDialogModule, MatAutocompleteModule, MatInputModule, MatListModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { CreationModalComponent } from './components/creation-modal/creation-modal.component';
import { DirectThreadCreationModalComponent } from './components/direct-thread-creation-modal/direct-thread-creation-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InviteToGroupModalComponent } from './components/invite-to-group-modal/invite-to-group-modal.component';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule,
     MatDialogModule, MatAutocompleteModule, FormsModule, MatListModule, MatIconModule, MatSnackBarModule
  ],
  declarations: [
    PanelComponent,
    NavBarComponent,
    CreationModalComponent,
    DirectThreadCreationModalComponent,
    InviteToGroupModalComponent,
  ],
  providers: [
  ],
  exports: [
    PanelComponent,
    NavBarComponent,
    CreationModalComponent,
    DirectThreadCreationModalComponent,
  ],
  entryComponents: [
    CreationModalComponent,
    DirectThreadCreationModalComponent,
    InviteToGroupModalComponent,
  ]

})
export class SharedModule {}
