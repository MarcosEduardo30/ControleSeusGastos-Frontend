import { Component, Input, input, OnInit } from "@angular/core";

@Component({
    selector: "app-notification",
    styleUrl: "./notification.component.css",
    templateUrl: "./notification.component.html"
})
export class NotificationComponent implements OnInit{
    @Input({required: true})
    errors!: string[];

    ngOnInit(): void {
        console.log(this.errors);
    }
}