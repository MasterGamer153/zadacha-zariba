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
    public auth: Auth,
    private router: Router,
    private chatService: ChatService,
    private socketService: SocketService
  ) {}

  // =============================
  // GETTERS
  // =============================

  get conversations() {
    return this.chatService.getConversations();
  }

  get selectedMessages() {
    return this.chatService.getMessagesForConversation(
      this.selectedConversationId
    );
  }

  // =============================
  // LIFECYCLE
  // =============================

  ngOnInit() {

    // Listen for real-time messages
    this.socketService.onNewMessage((message: any) => {
      this.chatService.addIncomingMessage(message);
    });

  }

  // =============================
  // ACTIONS
  // =============================

  selectConversation(id: number) {
    this.selectedConversationId = id;
  }

  sendMessage() {
    if (!this.selectedConversationId) return;

    const trimmed = this.newMessageText.trim();
    if (!trimmed) return;

    const user = this.auth.getUser(); // must return decoded JWT

    const messageData = {
      conversationId: this.selectedConversationId,
      content: trimmed,
      senderId: user.userId
    };

    // Send via socket (backend saves + broadcasts)
    this.socketService.sendMessage(messageData);

    this.newMessageText = '';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
