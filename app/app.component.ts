import {Component} from '@angular/core';

// Components
import { MessageComponent } from './message.component';
import { LoginComponent } from './login.component';

// Services
import { MessagingService } from './messaging.service';

@Component({
  selector: 'ifacts',
  templateUrl: 'app/app.component.html',
	directives: [MessageComponent],
	providers: [MessagingService]
})
export class AppComponent {

	constructor(private _messagingService: MessagingService) { }

  sendMessage() {
    let message = {
      title: 'Message Title',
      message: 'Just a simple message',
      options: [{type: 'default', label: 'Cancel'}, {type:'primary', label:'Upload'}]
    }
    this._messagingService.newMessage(message);
  }

  sendMessageComponent() {
    let message = {
      title: 'Example Login Message',
      messageComponent: LoginComponent,
      options: [{type: 'default', label: 'Cancel'}, {type:'primary', label:'Upload', action: 'login'}]
    }
    this._messagingService.newMessage(message).subscribe(data => {
      console.log(data); // Will log back the credentials entered into the form
    });
  }

}
