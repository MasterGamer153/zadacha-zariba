import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  constructor(private auth: Auth, private router: Router) {}

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
      lastMessage: 'Lets catch up',
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
    text: 'Lets catch up soon',
    createdAt: 'Yesterday',
  },
];


  selectedConversationId: number | null = null;

  selectConversation(id: number) {
    this.selectedConversationId = id;
  }

  get selectedMessages() {
  return this.messages.filter(
    msg => msg.conversationId === this.selectedConversationId
  );
}


  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }
}
