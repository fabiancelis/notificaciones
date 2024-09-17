import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from './app.module';
import { FcmService } from './fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'notificaciones';
  push: any;
  data = {
    titulo: 'Curso angular',
    mensaje: '',
    cuerpo: '',
    data: '',
    token: ''
  };
  channel: BroadcastChannel | undefined;
  mensajes: string[] = [];
  constructor(
    private fcm: FcmService
  ) {

    this.channel = new window.BroadcastChannel('bg-notification');
    this.channel.addEventListener('message', (payload) => {
      console.log('Notificacion en background', payload);
    })

  }

  ngOnInit(): void {
    this.registrar();
  }
  
  registrar() {
    const messaging = getMessaging();

    //getToken: Solicita permitir las notificaciones push y obtiene el token
    console.log(firebaseConfig.vapidKey)
    getToken(messaging, { vapidKey: firebaseConfig.vapidKey })
    .then((firebaseToken: string) => {
      this.data.token = firebaseToken;
      console.log(this.data.token);
      this.listen();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (messagePayload) => {
      console.log(messagePayload);
      if(messagePayload.notification?.body) this.mensajes.push(messagePayload.notification?.body)
    });
    
  }

  enviar() {
    this.fcm.enviarMensaje(this.data)
      .subscribe((response) => {
        console.log(response);
      })
  }

}
