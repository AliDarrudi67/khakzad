import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getFormData(form: any) {
    const fields = Object.keys(form.value)
    const formData = new FormData()
    fields.forEach(item => {
      formData.append(item, form.get(item).value)
    })
    return formData
  }

}
