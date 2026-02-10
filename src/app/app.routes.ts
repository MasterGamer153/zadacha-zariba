import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { AuthGuard } from './services/auth-guard';
import { Chat } from './components/chat/chat';
import { ConfirmExitGuard } from './services/exit-guard';

export const routes: Routes = [
    {path: 'login', component: Form },
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'chat', component: Chat, canActivate: [AuthGuard], canDeactivate: [ConfirmExitGuard] },
];
