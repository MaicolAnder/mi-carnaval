import { Component } from '@angular/core';
import { OpenAiChatService } from '../../services/open-ai-chat.service';
import { FormsModule, NgModel } from '@angular/forms';
import { error } from 'console';
import { finalize } from 'rxjs';
import { LocationsService } from '../../services/locations.service';
import { DeviceInfoService } from '../../../core/services/device-info.service';

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
  private visitorId: string;

  constructor(
    private openAiService: OpenAiChatService,
    private device: DeviceInfoService
  ) {
    this.visitorId = device.getVisitorId();
  }


  sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Agregar el mensaje del usuario al historial
    this.chatHistory.push({ role: 'user', content: this.userMessage });
    this.setChatMessage('El asistente IA está respondiendo...');

    // Llamar al servicio
    this.openAiService.sendMessageStream(this.visitorId, this.userMessage)
      .pipe(finalize(() => {
        this.userMessage = '';
        this.setChatMessage('¿Cuál es tu siguiente pregunta?');
      }))
      .subscribe(
        response => {
          try {
            console.log(response);
            const message = response.reply.choices[0].message.content;
            this.chatHistory.push({ role: 'assistant', content: message });
          } catch (error) {
            console.log(error);
            this.chatHistory.push({ role: 'assistant', content: response.reply.error.message })
          }
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
