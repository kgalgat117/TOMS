import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  payments: Array<Object> = []
  temp_payments: Array<Object> = []
  overview: any = {
    total: 0,
  }
  selected_payment: any = {}

  tenents: Array<object> = []
  tenentsParams: Object = {}

  constructor(private ownerService: OwnerService, private router: Router) {
    this.getPayments()
    this.getTenents()
  }

  tenentChange(event) {
    if (event.target.value) {
      this.payments = this.temp_payments.filter(item => {
        if (item['tenent']['phone'] == event.target.value) {
          return true
        }
        return false
      })
    } else {
      this.payments = this.temp_payments
    }
    this.getOverview()
  }

  getTenents() {
    this.ownerService.getTenents(this.tenentsParams).subscribe(resp => {
      console.log(resp)
      this.tenents = resp['result']
    }, err => {
      console.log(err)
    })
  }

  paymentUpdated() {
    this.ownerService.tenentPaymentUpdate(this.selected_payment).subscribe(resp => {
      console.log(resp)
      $('#paymentModal').modal('hide')
      this.payments[this.selected_payment.payment_index] = resp['result']
      this.getOverview()
    }, err => {
      console.log(err)
    })
  }

  updatePaymentModal(payment, index) {
    this.selected_payment._id = payment._id
    this.selected_payment.paid_on = payment.paid_on
    this.selected_payment.amount = payment.amount
    this.selected_payment.remarks = payment.remarks
    this.selected_payment.payment_index = index
  }

  deletePayment() {
    this.ownerService.tenentPaymentDelete(this.selected_payment).subscribe(resp => {
      this.payments.splice(this.selected_payment.payment_index, 1)
      $('#deleteModal').modal('hide')
      this.getOverview()
    }, err => {
      $('#deleteModal').modal('hide')
      console.log(err)
    })
  }

  getOverview() {
    this.overview.total = 0
    this.payments.forEach(item => {
      this.overview.total += item['amount']
    })
  }

  getPayments() {
    this.ownerService.getPayments({}).subscribe(resp => {
      this.payments = resp['result']
      this.temp_payments = resp['result']
      this.getOverview()
      console.log(resp['result'])
    }, err => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

}
