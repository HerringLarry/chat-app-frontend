import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: '../app/login/login.module#LoginModule',
    },
    {
        path: 'registration',
        loadChildren: '../app/registration/registration.module#RegistrationModule',
    },
    {
        path: 'mainwindow',
        loadChildren: '../app/main-window/main-window.module#MainWindowModule',
    },
    {
        path: 'groupselectionwindow',
        loadChildren: '../app/group-selection-window/group-selection-window.module#GroupSelectionWindowModule',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
