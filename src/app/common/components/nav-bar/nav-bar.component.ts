import { Component, OnInit } from '@angular/core';
import { UsernameService } from '../../services/username.service';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreationModalComponent } from '../creation-modal/creation-modal.component';
import { GroupService } from '../../services/group-service.service';
import { InviteToGroupModalComponent } from '../invite-to-group-modal/invite-to-group-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private _router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  checkIfUsernameExists(): boolean {
    return !!UsernameService.username;
  }

  logout() {
    LogoutService.logout();
    this._router.navigate(['login']);
  }

  goToProfile() {
    return 0;
  }

  goToListOfGroups() {
    this._router.navigate(['groupselectionwindow']);
  }

  goToMainWindow() {
    this._router.navigate(['mainwindow']);
  }

  goToLogin() {
    this._router.navigate(['login']);
  }

  getGroup() {
    return GroupService.group;
  }

  ifGroupSelected() {
    return GroupService.group !== '';
  }

  goToInvite() {
    this._router.navigate(['invitewindow']);
  }

  goToSettings() {
    this._router.navigate(['settings']);
  }

  openAddToGroupModal() {
    this._router.navigate(['sendinvitewindow']);
  }
}
