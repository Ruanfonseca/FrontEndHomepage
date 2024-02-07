import { Injectable } from '@angular/core';
import { templatemail } from '../model/templatemail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnviaEmailService {


  private url: string = 'http://localhost:8080/api/sendmail';



  constructor(private http: HttpClient) {

  }


  enviar(obj: templatemail): Observable<boolean> {

    try {
      this.http.post<templatemail>(this.url, obj);
      return new Observable<boolean>(observer => {
        observer.next(true);
        observer.complete();

      });

    } catch (error) {

      console.log(error);

    }

    return new Observable<boolean>(observer => {
      observer.error("Não foi possivel enviar")
    });





  }
}
