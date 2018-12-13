import { UsernameService } from './../common/services/username.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../common/services/group-service.service';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { CreationModalComponent } from '../common/components/creation-modal/creation-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-group-selection-window',
  templateUrl: './group-selection-window.component.html',
  styleUrls: ['./group-selection-window.component.css']
})
export class GroupSelectionWindowComponent implements OnInit {
  groups: any[];

  constructor(private _router: Router, private _dataRequestor: DataRequestorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this._dataRequestor.getRequest('groups/getUserGroups/' + UsernameService.username).subscribe( (res: any[]) => {
      console.log(res);
      this.groups = res;
    });
  }

  setGroupNameAndGoToMain(name: string) {
    GroupService.group = name;
    this._router.navigate(['mainwindow']);
  }

  openCreationModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        type: 'group',
    };

    this.dialog.open(CreationModalComponent, dialogConfig);
  }

}
