import { UsernameService } from './../common/services/username.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../common/services/group-service.service';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { CreationModalComponent } from '../common/components/creation-modal/creation-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GroupSelectionService } from '../common/services/group-selection.service';
import { Group } from './models/group.interface';

@Component({
  selector: 'app-group-selection-window',
  templateUrl: './group-selection-window.component.html',
  styleUrls: ['./group-selection-window.component.css']
})
export class GroupSelectionWindowComponent implements OnInit {
  groups: Group[];

  constructor(private _router: Router, private _dataRequestor: DataRequestorService, private dialog: MatDialog,
    private _groupSelectionService: GroupSelectionService) { }

  ngOnInit() {
  }

  setGroupNameAndGoToMain( group: any ) {
    GroupService.group = group.name;
    GroupService.id = group.id;
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
