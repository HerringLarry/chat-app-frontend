import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreationModalComponent } from 'src/app/common/components/creation-modal/creation-modal.component';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.css']
})
export class AddThreadComponent implements OnInit {

  constructor( private dialog: MatDialog ) { }

  ngOnInit() {
  }

  openCreationModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        type: 'thread',
    };

    this.dialog.open(CreationModalComponent, dialogConfig);
  }

}
