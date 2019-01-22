import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreationModalComponent } from 'src/app/common/components/creation-modal/creation-modal.component';
import { DirectThreadCreationModalComponent } from 'src/app/common/components/direct-thread-creation-modal/direct-thread-creation-modal.component';
import { ProcessedMessage } from '../models/processed-message';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  @Output() threadClick: EventEmitter<void> = new EventEmitter();
  @Input() threads: any;
  @Input() notifications: any[];
  @Input() directNotifications: any[];

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

  openDirectThreadCreationModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
    };

    this.dialog.open( DirectThreadCreationModalComponent, dialogConfig );
  }
}
