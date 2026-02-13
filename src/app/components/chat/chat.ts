import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {

  selectedConversationId: number | null = null;
  newMessageText: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private chatService: ChatService
  ) {}

  get conversations() {
    return this.chatService.getConversations();
  }

  get selectedMessages() {
    return this.chatService.getMessagesForConversation(
      this.selectedConversationId
    );
  }

  selectConversation(id: number) {
    this.selectedConversationId = id;
  }

  sendMessage() {
    if (!this.selectedConversationId) return;

    const trimmed = this.newMessageText.trim();
    if (!trimmed) return;

    this.chatService.sendMessage(this.selectedConversationId, trimmed);
    this.newMessageText = '';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
