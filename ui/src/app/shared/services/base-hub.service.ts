import { inject, Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { API_HOST_URL } from 'src/app/app.config';
 
@Injectable()
export abstract class BaseHubService<TEventMap extends Record<string, any>> implements OnDestroy {
  private hubConnection!: signalR.HubConnection;
  private eventSubjects = new Map<keyof TEventMap, Subject<any>>();
  private readonly hostUrl = inject(API_HOST_URL);
  protected abstract hubUrl: string;
 
  connect(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.hostUrl}/${this.hubUrl}`)
      .withAutomaticReconnect()
      .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('connected successfully'))
      .catch(err => console.error('connected error', err));
  }
 
  on<K extends keyof TEventMap>(eventName: K): Observable<TEventMap[K]> {
    if (!this.eventSubjects.has(eventName)) {
      const subject = new Subject<TEventMap[K]>();
      this.eventSubjects.set(eventName, subject);
      this.hubConnection.on(eventName as string, (data: TEventMap[K]) => subject.next(data));
    }
    return this.eventSubjects.get(eventName)!.asObservable();
  }
 
  ngOnDestroy(): void {
    this.hubConnection?.stop();
    this.eventSubjects.forEach(s => s.complete());
  }
}