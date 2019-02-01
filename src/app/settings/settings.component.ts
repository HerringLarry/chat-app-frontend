import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsDto } from './dto/settings.dto';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { UsernameService } from '../common/services/username.service';
import { MatSnackBar } from '@angular/material';
import { SettingsService } from '../common/services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  username = true;
  fullName = false;
  labelPosition: string;
  settings: SettingsDto;
  subscriptions: Subscription[] = [];

  constructor( private _dataRequestorService: DataRequestorService, private snackbar: MatSnackBar ) { }

  ngOnInit() {
    const request = 'settings/' + String(UsernameService.id);
    const sub = this._dataRequestorService.getRequest( request ).subscribe( (settings: SettingsDto) => {
      this.settings = settings;
    });
    this.subscriptions.push( sub );
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  modifyShowUsername(event: any) {
    this.settings.showUsername = event;
  }

  modifyShowNotifications(event: any) {
    this.settings.showNotifications = event;
  }

  modifyShowTime(event: any) {
    this.settings.showTime = event;
  }

  save() {
    const request = 'settings';
    this._dataRequestorService.putRequest( request, this.settings ).subscribe( res => {
      SettingsService.showUsername = this.settings.showUsername;
      SettingsService.showNotifications = this.settings.showNotifications;
      SettingsService.showTime = this.settings.showTime;
      this.snackbar.open('Settings Saved', 'Notification', {
        duration: 500,
      });
    });
  }


}
