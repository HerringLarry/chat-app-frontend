import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendInviteWindowComponent } from './send-invite-window.component';

const routes: Routes = [
    {
        path: '',
        component: SendInviteWindowComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendInviteWindowRoutingModule { }
