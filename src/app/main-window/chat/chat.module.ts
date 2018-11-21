import { ChatComponent } from './chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDisplayComponent } from './message-display/message-display.component';
import { MessageWriterComponent } from './message-writer/message-writer.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  declarations: [
    MessageDisplayComponent,
    MessageWriterComponent,
    ChatComponent,
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule { }
