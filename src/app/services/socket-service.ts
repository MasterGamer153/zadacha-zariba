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

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  onNewMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
  
}
