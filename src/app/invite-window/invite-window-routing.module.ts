import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteWindowComponent } from './invite-window.component';

const routes: Routes = [
    {
        path: '',
        component: InviteWindowComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteWindowRoutingModule { }
