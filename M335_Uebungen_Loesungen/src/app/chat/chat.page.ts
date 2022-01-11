import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
    @ViewChild('scrollMe', { static: false })
    private myScrollContainer: ElementRef;

    message: string;
    showSpinnerIcon: boolean = false;
    showDates: boolean = false;
    chatList: Observable<ChatMessage[]>;
    chatListRef: AngularFireList<ChatMessage>;
    /* TODO: Bitte anpassen */
    groupNumber: string = 'G0'; // Bsp. G1
    currentUser: string = 'Test'; // Bsp. Ralph

    constructor(
        afDb: AngularFireDatabase    ) {
        this.chatListRef = afDb.list('/chats/' + this.groupNumber);
        this.chatList = this.chatListRef.valueChanges();
    }

    ngOnInit() {
        this.scrollToBottom();
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop =
                this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {}
    }
    swipeEvent(swipe) {
        // 2  = Right to left swipe
        // 4  = Left to right swipe
        if (swipe.direction == 2 || swipe.direction == 4) {
            this.showDates = !this.showDates; // Toggle
        }
    }

    stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xff;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }

    sendMessage() {
        if (this.message != '') {
            this.showSpinnerIcon = true;
            let formattedDate = new Date().toLocaleString();
            this.chatListRef.push({
                username: this.currentUser,
                text: this.message,
                date: formattedDate,
            });

            this.message = '';
            this.showSpinnerIcon = false;
        }
    }
}
interface ChatMessage {
    username: string;
    text: string;
    date: any;
}
