import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { CourseService } from "../course.service";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;
  recipient: any;

  constructor(private courseService: CourseService, private header: HeaderComponent) { }

  ngOnInit(): void {

    console.log(this.header.role);

    if (this.header.role == "admin") {
      this.recipient = "sanah@yahoo.com";
    } else if (this.header.role == "instructor") {
      this.recipient = "arsh.lalani@akahyd.org";
    } else if (this.header.role == "chair") {
      this.recipient = "juan@gmail.com";
    }

    console.log(this.recipient);

    this.courseService.getNotifications(this.recipient).subscribe(events => {
      console.log(events);
      this.notifications = events;
    })

  }

  markAsRead(message) {
    this.courseService.updateNotification(this.recipient, message).subscribe(response => {
      console.log(response);
    })
  }

}
