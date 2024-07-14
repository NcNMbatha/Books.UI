import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn:'root'
})

export class SpinerService{

    private spinning = new BehaviorSubject<boolean>(false);
    readonly spinning$ = this.spinning.asObservable();

    constructor() {}

    showSpinner(){
        this.spinning.next(true);
    }

    hideSpinner(){
     this.spinning.next(false);   
    }
}