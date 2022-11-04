import { APP_SERVICE_CONFIG } from '@services/app-config.service';
import { Inject, Injectable } from '@angular/core';
import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { io, Socket } from 'socket.io-client';
import { AppConfig } from '@interfaces/app-config.interface';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    socket: Socket | undefined;

    constructor(@Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig) {}

    setupSocketConnection(currentUser: CurrentUser): void {
        this.socket = io(this.appConfig.SOCKET_URL, {
            auth: {
                token: currentUser.token,
            },
        });
    }

    disconnect(): void {
        if (!this.socket) throw new Error('Socket connection is not established');
        this.socket.disconnect();
    }

    emit(eventName: string, message: any): void {
        if (!this.socket) throw new Error('Socket connection is not established');
        this.socket.emit(eventName, message);
    }

    listen<T>(eventName: string): Observable<T> {
        const socket = this.socket;
        if (!socket) throw new Error('Socket connection is not established');

        return new Observable((subscriber: Subscriber<T>) => {
            socket.on(eventName, (data: any): void => subscriber.next(data));
        });
    }
}
