import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  AuthenticateUser: boolean;

  constructor() {

   }

  ngOnInit() {
  }

}
