import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreationModalComponent } from 'src/app/common/components/creation-modal/creation-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() threadClick: EventEmitter<void> = new EventEmitter();
  @Input() threads: any;

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
  }

  onThreadClick(event: any): void {
    this.threadClick.emit(event);
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
