import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() order_by: EventEmitter<number> = new EventEmitter();

  constructor() { }
  emit_username(value) {
    this.username.emit(value);
  }
  emit_order_by(value) {
    this.order_by.emit(value);
  }

}
