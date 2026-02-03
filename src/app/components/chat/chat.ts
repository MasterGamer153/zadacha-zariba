import { Component } from '@angular/core';

interface Message {
  text: string;
  sender: 'me' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat {
  messages: Message[] = [];
  newMessage = '';

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messages.push({
      text: this.newMessage,
      sender: 'me',
      timestamp: new Date()
    });

    // placeholder bot reply
    setTimeout(() => {
      this.messages.push({
        text: 'Hello 👋 (replace me with real backend)',
        sender: 'bot',
        timestamp: new Date()
      });
    }, 500);

    this.newMessage = '';
  }
}
