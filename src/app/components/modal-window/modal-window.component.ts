import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  @Input()
  modalTitle: string;

  @Input()
  showModal: boolean;

  @Input()
  hideCloseBtn = true;

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
