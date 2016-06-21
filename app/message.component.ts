import {Component, AfterViewInit, OnDestroy, DynamicComponentLoader, Injector, ViewChild, ViewContainerRef, ElementRef, Renderer} from '@angular/core';

// Types
import { Subscription } from 'rxjs/Subscription';
import { Message, Option } from './message';

// Services
import { MessagingService } from './messaging.service';

@Component({
  selector: 'message',
  host: {
    '(update)': 'update()'
  },
  templateUrl: 'app/components/Message/message.component.html'
})
export class MessageComponent implements AfterViewInit, OnDestroy {

  message$: Message;
  displayMessage: boolean;
  options: Array<Option>;
  component: any;
  private _inputs: any;
  private _subscriptions: Array<Subscription>;

  @ViewChild('messageContent',
    {read: ViewContainerRef}) messageContent: ViewContainerRef;

  constructor(private _messagingService: MessagingService, private _dcl: DynamicComponentLoader, private _injector: Injector) {
    this.displayMessage = false;
    this._subscriptions = [];
  }

  ngAfterViewInit() {
    this._subscriptions.push(this._messagingService.messages$.subscribe(message => {
      this.message$ = message;
      this.options = message.options;
      if(message.inputs) {
        this._inputs = message.inputs;
      }

      if (this.messageContent && message.messageComponent) {
        this._dcl.loadNextToLocation(message.messageComponent, this.messageContent).then((ref) => {
          for (let key in this._inputs) {
            ref.instance[key] = this._inputs[key];
          }
          this.component = ref;
        });
      }
      this.displayMessage = true;
    }));

    let self = this;
    window.addEventListener("keyup", function(event: any) {
        if (event.keyCode == 13 && self.displayMessage == true) {
          event.preventDefault();
          let index = self.options.length - 1;
          self.respond(index);
        }
        if (event.keyCode == 27 && self.displayMessage == true) {
          event.preventDefault();
          self.displayMessage = false;
          if (self.component !== undefined) {
            self.component.destroy();
          }
          self._messagingService.respond('Cancel');
        }
    });

  }

  respond(index: number) {
    if ('action' in this.message$.options[index]) {
      this.component.instance[this.message$.options[index].action]().then(success => {
        this.displayMessage = false;
        if (this.component !== undefined) {
          this.component.destroy();
        }
        this._messagingService.respond(this.message$.options[index].label);
      }, failure => {
        console.log(failure);
      });
    } else {
      this.displayMessage = false;
      if (this.component !== undefined) {
        this.component.destroy();
      }
      this._messagingService.respond(this.message$.options[index].label);
    }
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    for(let i in this._subscriptions) {
      this._subscriptions[i].unsubscribe();
    }
  }
}
