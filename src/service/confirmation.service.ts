import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private _fullName = new BehaviorSubject<string>('');
  fullName$ = this._fullName.asObservable();

  constructor() { }

  setFullName(name: string): void {
    this._fullName.next(name);
  }
}
