import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:4200/'

  assignPropertyTenent(data) {
    return this.http.post(this.URL + 'property/tenent', data)
  }

  removePropertyTenent(data) {
    return this.http.delete(this.URL + 'property/tenent', { params: data })
  }

  makeNewProperty(data, params) {
    return this.http.post(this.URL + 'property', data, { params: params })
  }

  getProperties(params) {
    return this.http.get(this.URL + 'property/all', { params: params })
  }

  updateProperty(data, params) {
    return this.http.put(this.URL + 'property', data, { params: params })
  }

  getProperty(params) {
    return this.http.get(this.URL + 'property', { params: params })
  }

  makeNewMeter(data, params) {
    return this.http.post(this.URL + 'meter', data, { params: params })
  }

  getMeters(params) {
    return this.http.get(this.URL + 'meter/all', { params: params })
  }

  updateMeter(data, params) {
    return this.http.put(this.URL + 'meter', data, { params: params })
  }

  getMeter(params) {
    return this.http.get(this.URL + 'meter', { params: params })
  }

  makeNewTenent(data, params) {
    return this.http.post(this.URL + 'tenent', data, { params: params })
  }

  getTenents(params) {
    return this.http.get(this.URL + 'tenent/all', { params: params })
  }

  updateTenent(data, params) {
    return this.http.put(this.URL + 'tenent', data, { params: params })
  }

  getTenent(params) {
    return this.http.get(this.URL + 'tenent', { params: params })
  }

  tenentPaid(data) {
    return this.http.post(this.URL + 'tenent/payment', data)
  }

  tenentPaymentUpdate(data) {
    return this.http.put(this.URL + 'tenent/payment', data)
  }

  tenentPaymentDelete(data) {
    return this.http.delete(this.URL + 'tenent/payment', { params: data })
  }

  tenentPayments(params) {
    return this.http.get(this.URL + 'tenent/payments', { params: params })
  }

  tenentReading(data) {
    return this.http.post(this.URL + 'tenent/reading', data)
  }

  getPayments(params) {
    return this.http.get(this.URL + 'tenent/payments', { params: params })
  }

}
