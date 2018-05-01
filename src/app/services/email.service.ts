import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const sgMail = require('@sendgrid/mail');


@Injectable()
export class EmailService {

  constructor() {
    sgMail.setApiKey(environment.sendgrid.apiKey);
  }

  sendMail(options) {
    sgMail.send(options);
  }


}
