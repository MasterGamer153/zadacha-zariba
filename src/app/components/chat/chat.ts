import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';
import { SocketService } from '../../services/socket-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnInit {

  selectedConversationId: number | null = null;
  newMessageText: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private chatService: ChatService,
    private socketService: SocketService,
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

  ngOnInit() {
    this.socketService.onNewMessage((message: string) => {
      console.log('New message received:', message);
      // Optionally, you can refresh the conversations or messages here
    });
  }
}
