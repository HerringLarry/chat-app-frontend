import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { CurrentDirectThreadsService } from '../common/services/current-direct-threads.service';
import { GroupService } from '../common/services/group-service.service';
import { UsernameService } from '../common/services/username.service';
import { User } from '../common/components/direct-thread-creation-modal/model/user.model';

@Component({
  selector: 'app-send-invite-window',
  templateUrl: './send-invite-window.component.html',
  styleUrls: ['./send-invite-window.component.css']
})
export class SendInviteWindowComponent implements OnInit {
  options: User[] = [];

  constructor(private _dataRequestorService: DataRequestorService,
      private _currentDirectThreadService: CurrentDirectThreadsService,
    ) {
  }

  ngOnInit() {
    const requestString = 'invites/' + GroupService.group + '/' + UsernameService.username;
    const unprocessedOption = this._dataRequestorService.getRequest(requestString).subscribe( (res: User[]) => {
      this.options = res;
    });

  }

  removeUser( event: any ) {

    const index = this.options.findIndex( (option => {
      return event.id === option.id;
    }));

    this.options.splice( index, 1);
  }

  noUsers(): boolean {
    return this.options.length === 0;
  }
}
