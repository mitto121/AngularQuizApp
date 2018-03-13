import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'timer',
  template: ` <h4 [ngStyle]="{'color':targetTimeInMinutes<10?'red':'black'}">                
                  {{targetTimeInMinutes}} 
                  :{{(second) && (second > 0) ? 59-second : '60'}} <br/>
                </h4>`
})
export class TimerComponent implements OnInit {

  @Input()
  targetTimeInMinutes:number;

  @Output()
  onTimeOut:EventEmitter<any>=new EventEmitter();

  second:number;
  minutes:number;
  displayMinutes:number;
  timerSubs:Subscription;
  subject = new Subject();
  constructor() { }

  ngOnInit() {
    this.targetTimeInMinutes-=1;
    this.startTimer();
  }

  startTimer()
  {
    let timer = Observable.timer(1, 1000);
    this.timerSubs= timer     
      .subscribe(
      t => {
          this.second =this.getSeconds(t);         
          this.minutes=this.getMinutes(t);
          this.stopTimer();
      },
      err=>console.error(err));
  }
  private stopTimer() {  
    if(this.second==59)
    {
      this.targetTimeInMinutes=this.targetTimeInMinutes-1;      
    }
    if(this.targetTimeInMinutes==0 && this.second<=60)
    {        
      this.timerSubs.unsubscribe();
      this.onTimeOut.emit();
    }
  }
  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }
  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }
  private pad(digit: any) { 
    return digit <= 9 ? '0' + digit : digit;
}
}
