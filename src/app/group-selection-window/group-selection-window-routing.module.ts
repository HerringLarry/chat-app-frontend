import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupSelectionWindowComponent } from './group-selection-window.component';

const routes: Routes = [
    {
        path: '',
        component: GroupSelectionWindowComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupSelectionWindowRoutingModule { }
