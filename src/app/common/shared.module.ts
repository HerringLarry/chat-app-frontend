import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { CreationModalComponent } from './components/creation-modal/creation-modal.component';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDialogModule,
  ],
  declarations: [
    PanelComponent,
    NavBarComponent,
    CreationModalComponent,
  ],
  providers: [
  ],
  exports: [
    PanelComponent,
    NavBarComponent,
    CreationModalComponent,
  ],
  entryComponents: [
    CreationModalComponent,
  ]

})
export class SharedModule {}
