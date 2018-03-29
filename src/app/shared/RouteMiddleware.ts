import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { LoadingIndicatorService } from "../services/loading-indicator.service";

@Injectable()
export class RouteMiddleware implements HttpInterceptor {

  constructor(private _loadingIndicatorService: LoadingIndicatorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    this._loadingIndicatorService.onRequestStarted()
    console.log( this._loadingIndicatorService._loading);
    
    var response = next.handle(request).finally(
      ()=> this._loadingIndicatorService.onRequestFinished()
    );
    
    console.log( this._loadingIndicatorService._loading);

    return response;
  }
}