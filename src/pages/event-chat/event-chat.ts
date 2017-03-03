import { Component, OnInit } from '@angular/core';

import { Database } from '@ionic/cloud-angular';

@Component({
    selector: 'event-chat',
    templateUrl: 'event-chat.html'
})
export class EventChat implements OnInit {
    
    channels = this.db.collection('chat-channels');
    
    constructor(private db: Database) {
        this.channels.watch().subscribe(allChatChannels => {
            console.log('Channels: ', allChatChannels);
        })
    }

    ngOnInit() { }
}