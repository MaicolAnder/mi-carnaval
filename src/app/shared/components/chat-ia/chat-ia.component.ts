import { Component } from '@angular/core';
import { OpenAiChatService } from '../../services/open-ai-chat.service';
import { FormsModule, NgModel } from '@angular/forms';
import { error } from 'console';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-chat-ia',
    imports: [FormsModule],
    templateUrl: './chat-ia.component.html',
    styleUrl: './chat-ia.component.css'
})
export class ChatIaComponent {
  isOpen = false;
  userMessage: string = '';
  chatHistory: { role: string, content: string }[] = [];
  chat_message: string = 'Soy el asistente IA de Mi Carnaval. ¿En qué puedo ayudarte?';

  constructor(private openAiService: OpenAiChatService) { }


  sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Agregar el mensaje del usuario al historial
    this.chatHistory.push({ role: 'user', content: this.userMessage });
    this.setChatMessage('El asistente IA está respondiendo...');

    // Llamar al servicio
    this.openAiService.sendMessage(this.userMessage)
      .pipe(finalize(() => {
        this.userMessage = '';
        this.setChatMessage('¿Cuál es tu siguiente pregunta?');
      }))
      .subscribe(
        response => {
          const reply = response.choices[0].message.content;
          this.chatHistory.push({ role: 'assistant', content: reply });
        },
        error => {
          this.chatHistory.push({ role: 'assistant', content: error.error.error.message })
        }

      );
  }

  setChatMessage(message: string) {
    if(this.chatHistory.length > 0) {
      this.chat_message = message;
    }
  }

  // Función para abrir el drawer
  openDrawer() {
    this.isOpen = true;
    document.getElementById('chatDrawer')?.classList.remove('translate-x-full');
  }

  // Función para cerrar el drawer
  closeDrawer() {
    this.isOpen = false;
    document.getElementById('chatDrawer')?.classList.add('translate-x-full');
  }
}
