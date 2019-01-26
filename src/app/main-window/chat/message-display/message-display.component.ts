import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from 'src/app/common/services/settings.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDisplayComponent implements OnInit {


  @Input() messages: any[];
  processedMessages: any;
  previousUsername = '';

  constructor( private _loadingService: LoadingService,
    private _threadService: ThreadService,
    private _directThreadService: DirectThreadService,
    ) { }

  ngOnInit() {
  }

  isLoading(): boolean {
    return this._loadingService.isLoading;
  }

  isEmptyAndThreadSelected(): boolean {
    return this.messages.length === 0 && ( this._threadService.selected || this._directThreadService.selected );
  }

  setPreviousUsername( event: any ) {
    this.previousUsername = event;
  }

}
