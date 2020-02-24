import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,    
} from '@angular/common/http';
import { Observable } from 'rxjs';

//show loading animation based on ajax request
@Injectable()
export class HttpInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor() {}

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }              
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                event => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(req);
                        observer.next(event);
                    }
                },
                err => { this.removeRequest(req); observer.error(err); },
                () => { this.removeRequest(req); observer.complete(); });
            // teardown logic in case of cancelled requests
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
