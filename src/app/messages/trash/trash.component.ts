import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
  imports: [CommonModule]  // Ajoutez cette ligne pour inclure le CommonModule
})
export class TrashComponent implements OnInit {
  messages: string[] = [
    'Message supprimé 1',
    'Message supprimé 2'
  ];

  constructor() { }

  ngOnInit(): void { }

  restoreMessage(message: string): void {
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
      console.log(`${message} restauré`);
    }
  }
}
