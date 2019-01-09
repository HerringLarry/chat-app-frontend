import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {


  @Input() messages: any;
  processedMessages: any;

  constructor() { }

  ngOnInit() {
    console.log(this.messages);
  }


}
