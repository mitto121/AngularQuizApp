import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  @Input()
  modalTitle: string='Alert !!';

  @Input()
  showModal: boolean;

  @Input()
  showCloseBtn:boolean ;

  @Output() onCloseModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  closeModal() {
    this.onCloseModal.emit();
    this.showModal = false;
  }
  SubmitCloseModal(asd)
  {
    console.log('aasdas');
  }
}
