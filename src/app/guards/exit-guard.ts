import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Chat } from '../components/chat/chat';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfirmExitGuard implements CanDeactivate<Chat> {
  constructor(private auth: Auth, private router: Router) {}
  canDeactivate(component: Chat): boolean {
    if(confirm('Are you sure you want to leave this page?')) {
      this.auth.logout();
      return true;
    }
    return false;
  }

  
}
