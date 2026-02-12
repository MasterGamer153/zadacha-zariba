import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Chat } from '../components/chat/chat';

@Injectable({
  providedIn: 'root',
})
export class ConfirmExitGuard implements CanDeactivate<Chat> {
  canDeactivate(): boolean {
    return confirm('Are you sure you want to leave the chat?');
  }
}
