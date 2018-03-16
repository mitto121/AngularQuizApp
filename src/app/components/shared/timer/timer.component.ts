import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'timer',
  template: ` <h4 [ngStyle]="{'color':minutes<10?'red':'black'}">
                  {{minutes}}:{{second}}<br/>                
                </h4>`
})
export class TimerComponent implements OnInit {

  @Input()
  targetTimeInMinutes: number;

  TotalTimeInSeconds: number;

  @Output()
  onTimeOut: EventEmitter<any> = new EventEmitter();

  second: number;
  minutes: number;

  timerSubs: Subscription;

  constructor() { }

  ngOnInit() {  
    if (localStorage.getItem('remaingTime')) {
      this.TotalTimeInSeconds = Number(localStorage.getItem('remaingTime'));
    }
    else {
      this.TotalTimeInSeconds = this.targetTimeInMinutes * 60;
    }
    if (this.TotalTimeInSeconds) {
      this.startTimer();
    }
  }

  startTimer() {
    const timer = Observable.timer(1, 1000);
    this.timerSubs = timer
      .subscribe(
        t => {
          this.TotalTimeInSeconds = this.TotalTimeInSeconds - 1;
          this.minutes = this.getMinutes(this.TotalTimeInSeconds);
          this.second = this.getSeconds();
          this.stopTimer();
        },
        err => console.error(err));
  }
  private stopTimer() {
    localStorage.setItem('remaingTime', String(this.TotalTimeInSeconds));

    if (this.minutes == 0 && this.second == 0) {
      this.timerSubs.unsubscribe();
      localStorage.removeItem('remaingTime');
      this.onTimeOut.emit();
    }
  }

  private getSeconds() {
    return this.TotalTimeInSeconds - (this.minutes * 60)
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }
  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
