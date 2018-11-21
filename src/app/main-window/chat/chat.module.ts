import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDisplayComponent } from './message-display/message-display.component';
import { MessageWriterComponent } from './message-writer/message-writer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageDisplayComponent,
    MessageWriterComponent,
  ]
})
export class ChatModule { }
