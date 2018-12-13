import { Component, OnInit, Input } from '@angular/core';
import { UsernameService } from 'src/app/common/services/username.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: any;

  constructor() { }

  ngOnInit() {
  }

  isCurrent(): boolean {
    console.log(this.message);
    return this.message.username === UsernameService.username;
  }

}
