import { ChatComponent } from './chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDisplayComponent } from './message-display/message-display.component';
import { MessageWriterComponent } from './message-writer/message-writer.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { MessageComponent } from './message-display/message/message.component';
import { EmojiModule } from 'angular-emoji/dist';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    EmojiModule,
  ],
  declarations: [
    MessageDisplayComponent,
    MessageWriterComponent,
    ChatComponent,
    MessageComponent,
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule { }
