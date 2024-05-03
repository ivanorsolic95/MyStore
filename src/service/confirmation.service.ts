import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private Name = new BehaviorSubject<string>('');
  fullName$ = this.Name.asObservable();
  
  private LastName = new BehaviorSubject<string>('');
  lastName$ = this.LastName.asObservable()

  private Address = new BehaviorSubject<string>('');
  address$ = this.Address.asObservable()

  private PostalCode = new BehaviorSubject<string>('');
  postalCode$ = this.PostalCode.asObservable()

  private City = new BehaviorSubject<string>('');
  city$ = this.City.asObservable()

  private PaymentMethod = new BehaviorSubject<string>('');
  paymentMethod$ = this.PaymentMethod.asObservable()

  private CreditCard = new BehaviorSubject<string>('');
  creditCard$ = this.CreditCard.asObservable()


  constructor() { }

  setName(name: string): void {
    this.Name.next(name);
  }

  setLastName(lastName: string): void {
    this.LastName.next(lastName);
  }

  setAddress(address: string) : void {
    this.Address.next(address);
  }

  setPostalCode(postalCode: string) : void {
    this.PostalCode.next(postalCode);
  }

  setCity(city: string) : void {
    this.City.next(city);
  }

  setPaymentMethod(paymentMethod: string) : void {
    this.PaymentMethod.next(paymentMethod);
  }
  
  setCreditCard(creditCard: string) : void {
    this.CreditCard.next(creditCard);
  }

}
