import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  conversations = [
    {
      id: 1,
      name: 'General Chat',
      lastMessage: '',
      updatedAt: '',
    },
    {
      id: 2,
      name: 'Announcements Chat',
      lastMessage: '',
      updatedAt: '',
    },
  ];

  messages: any[] = [];

  // =============================
  // GETTERS
  // =============================

  getConversations() {
    return this.conversations;
  }

  getMessagesForConversation(conversationId: number | null) {
    return this.messages.filter(
      msg => msg.conversationId === conversationId
    );
  }

  // =============================
  // SOCKET MESSAGE HANDLER
  // =============================

  addIncomingMessage(message: any) {

    // Transform backend format to frontend format
    const formattedMessage = {
      id: message.id,
      conversationId: message.conversation_id,
      sender: message.sender_id ? 'other' : 'me', // simple logic
      content: message.content,
      createdAt: message.created_at
    };

    this.messages.push(formattedMessage);

    const convo = this.conversations.find(
      c => c.id === formattedMessage.conversationId
    );

    if (convo) {
      convo.lastMessage = formattedMessage.content;
      convo.updatedAt = 'just now';
    }
  }

}
