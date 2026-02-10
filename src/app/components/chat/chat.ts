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
    { id: 1,
      name: 'Alice',
      lastMessage: 'Hey, how are you?',
      createdAt: new Date('2024-06-01T10:00:00'),
     },
    { id: 2,
      name: 'Bob',
      lastMessage: 'See you later!',
      createdAt: new Date('2024-06-01T11:00:00'),
     },
  ];

  selectedConversationId: number | null = 1;

  selectConversation(id: number) {
    this.selectedConversationId = id;
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }
}
