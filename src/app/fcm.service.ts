import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private http: HttpClient
  ) {

  }

  enviarMensaje(datos: any) {
    return this.http.post('http://localhost:3000/sendMsg',datos);
  }

}
