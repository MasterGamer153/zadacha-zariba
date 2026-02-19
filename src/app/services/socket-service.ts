import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with your server URL
  }

  sendMessage(message: { conversationId: number; content: string; senderId: any; }): void {
    this.socket.emit('sendMessage', message);
  }

  onNewMessage(callback: (message: any) => void): void {
    this.socket.on('newMessage', callback);
  }
  
}
