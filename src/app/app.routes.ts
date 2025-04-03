import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ContactsTableComponent } from './contacts/contacts-table/contacts-table.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { SentMessagesComponent } from './messages/sent-messages/sent-messages.component';
import { ReceivedMessagesComponent } from './messages/received-messages/received-messages.component';
import { FavoritesComponent } from './messages/favorites/favorites.component';
import { TrashComponent } from './messages/trash/trash.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { MonCompteComponent } from './profile/mon-compte/mon-compte.component';
import { MessageFormComponent } from './messages/message-form/message-form.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './pages/home/home.component';
import { VerificationComponent } from './auth/verifey/verifey.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige vers Login par défaut

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'verifey', component: VerificationComponent},
  {path: 'newpassword', component: NewPasswordComponent},

  { 
    path: 'home', 
    component: HomeComponent
  }, 
  { path: 'contacts', component: ContactsTableComponent },

  { 
    path: 'messages', 
    component: MessagesListComponent,
    children: [
      { path: 'sent', component: SentMessagesComponent },
      { path: 'received', component: ReceivedMessagesComponent },
      { path: 'favorites', component: FavoritesComponent }
    ]
  },
  { path: 'trash', component: TrashComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'mon-compte', component: MonCompteComponent },
  {path: 'message-form', component: MessageFormComponent},
  { path: 'notifications', component: NotificationsComponent },

  // Si l'URL ne correspond à aucune route définie, redirige vers Home
  { path: '**', redirectTo: '/Home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
