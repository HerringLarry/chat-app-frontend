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
    },
    {
        path: 'invitewindow',
        loadChildren: '../app/invite-window/invite-window.module#InviteWindowModule'
    },
    {
        path: 'sendinvitewindow',
        loadChildren: '../app/send-invite-window/send-invite-window.module#SendInviteWindowModule'
    },
    {
        path: 'settings',
        loadChildren: '../app/settings/settings.module#SettingsModule'
    },
    {
        path: 'profile-editor',
        loadChildren: '../app/profile-editor/profile-editor.module#ProfileEditorModule'
    },
    {
        path: 'profile-photo-editor',
        loadChildren: '../app/profile-photo-editor/profile-photo-editor.module#ProfilePhotoEditorModule'
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
