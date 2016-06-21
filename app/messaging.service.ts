import {Injectable, OnDestroy} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Message } from './message';

@Injectable()
export class MessagingService {

	// DataStreams
	private _messages: Observer<Message>;
	messages$: Observable<Message>;
	responses$: ReplaySubject<any>;

	// Internal Variables
	private _message: Message;

	constructor() {
		// Init DataStream
		this.messages$ = <Observable<Message>>new Observable(observer => this._messages = observer);
	}

	newMessage(message: Message) {
		this._message = message;
		this._messages.next(this._message);

		this.responses$ = new ReplaySubject(1);
		this.responses$;

		return this.responses$
	}

	update(response: any) {
		this.responses$.next(response);
	}

	respond(response: any) {
		this.responses$.next(response);
		this.responses$.complete();
	}

}
