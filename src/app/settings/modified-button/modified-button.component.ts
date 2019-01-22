import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modified-button',
  templateUrl: './modified-button.component.html',
  styleUrls: ['./modified-button.component.css']
})
export class ModifiedButtonComponent implements OnInit {

  @Input() text: string;
  @Input() isSelected: boolean;
  @Input() emitValue: boolean;
  @Output() alterIsSelected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  modifyIsSelected() {
    this.alterIsSelected.emit( this.emitValue );
  }


}
