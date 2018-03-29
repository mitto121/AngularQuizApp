import { Injectable } from "@angular/core";

@Injectable()
export class LoadingIndicatorService {

     _loading: boolean;

    get loading(): boolean {
        return this._loading;
    }

    onRequestStarted(): void {
        this._loading = true;       
    }

    onRequestFinished(): void {
        this._loading = false;
    }
}