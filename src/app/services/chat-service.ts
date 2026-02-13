import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  conversations = [
    {
      id: 1,
      name: 'Alice',
      lastMessage: 'Hey, how are you?',
      updatedAt: '5 minutes ago',
    },
    {
      id: 2,
      name: 'Bob',
      lastMessage: 'Did you see this?',
      updatedAt: '1 hour ago',
    },
    {
      id: 3,
      name: 'Charlie',
      lastMessage: 'Let’s catch up',
      updatedAt: 'Yesterday',
    },
  ];

  messages = [
    {
      id: 1,
      conversationId: 1,
      sender: 'me',
      text: 'Hi Alice!',
      createdAt: 'just now',
    },
    {
      id: 2,
      conversationId: 1,
      sender: 'other',
      text: 'Hey, how are you?',
      createdAt: '1 minute ago',
    },
    {
      id: 3,
      conversationId: 2,
      sender: 'other',
      text: 'Did you see this?',
      createdAt: '1 hour ago',
    },
    {
      id: 4,
      conversationId: 3,
      sender: 'me',
      text: 'Let’s catch up soon',
      createdAt: 'Yesterday',
    },
  ];

  getConversations() {
    return this.conversations;
  }

  getMessagesForConversation(conversationId: number | null) {
    return this.messages.filter(
      msg => msg.conversationId === conversationId
    );
  }

  sendMessage(conversationId: number, text: string) {
    const newMessage = {
      id: this.messages.length + 1,
      conversationId,
      sender: 'me',
      text,
      createdAt: 'just now',
    };

    this.messages.push(newMessage);

    const convo = this.conversations.find(c => c.id === conversationId);
    if (convo) {
      convo.lastMessage = text;
      convo.updatedAt = 'just now';
    }
  }
}
