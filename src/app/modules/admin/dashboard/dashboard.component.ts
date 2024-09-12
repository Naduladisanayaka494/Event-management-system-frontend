import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service'; // Adjust the path accordingly

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalEvents: number = 0;
  totalParticipants: number = 0;
  recentEvents: any[] = [];
  upcomingEvents: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getAllEvents().subscribe((events) => {
      this.totalEvents = events.length;
      this.totalParticipants = events.reduce(
        (acc, event) => acc + (event.assignedSingerId ? 1 : 0),
        0
      );

      // Convert eventDateTime to Date objects
      const now = new Date();
      const sortedEvents = events
        .map((event) => ({
          ...event,
          eventDateTime: new Date(event.eventDateTime), // Convert to Date object
        }))
        .sort((a, b) => a.eventDateTime.getTime() - b.eventDateTime.getTime());

      // Split events into recent and upcoming
      this.recentEvents = sortedEvents
        .filter((event) => event.eventDateTime < now)
        .slice(0, 5);
      this.upcomingEvents = sortedEvents
        .filter((event) => event.eventDateTime >= now)
        .slice(0, 5);
    });
  }
}
