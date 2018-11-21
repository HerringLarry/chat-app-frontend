import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatMenuModule, MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatToolbarModule
  ],
  declarations: [
    PanelComponent,
    NavBarComponent,
  ],
  providers: [
  ],
  exports: [
    PanelComponent,
    NavBarComponent,
  ],
})
export class SharedModule {}
