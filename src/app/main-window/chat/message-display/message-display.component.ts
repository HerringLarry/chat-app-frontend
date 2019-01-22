import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from 'src/app/common/services/settings.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDisplayComponent implements OnInit {


  @Input() messages: any;
  processedMessages: any;

  constructor() { }

  ngOnInit() {
  }
}
