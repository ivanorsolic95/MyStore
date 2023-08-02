import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'src/service/confirmation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {
  fullName: string = '';

  constructor(private confirmationService: ConfirmationService,
                      private router: Router) {}

  ngOnInit(): void {
    this.confirmationService.fullName$.subscribe(name => this.fullName = name);
  }

  goToProductList () {
    this.router.navigate(['/']);
  }
}
