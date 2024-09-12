import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service'; // Adjust the path


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  events: any[] = [];
  singers: any[] = [];
  filter = { startDate: '', endDate: '', singerId: '' };
  selectedEvent: any = null;
  editForm: FormGroup;

  constructor(
    private eventService:  AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      eventDateTime: ['', Validators.required],
      assignedSingerId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadSingers();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  loadSingers(): void {
   this.eventService.getAllSingers().subscribe((singers) => {
     this.singers = singers;
     console.log('hi', singers);
   });
  }

  openEditModal(event: any): void {
    this.selectedEvent = event;
    this.editForm.patchValue({
      eventName: event.eventName,
      location: event.location,
      eventDateTime: new Date(event.eventDateTime).toISOString().slice(0, 16), // Format date
      assignedSingerId: event.assignedSingerId,
    });
  }

  closeEditModal(): void {
    this.selectedEvent = null;
  }

  updateEvent(): void {
    if (this.editForm.valid) {
      this.eventService
        .updateEvent(this.selectedEvent.id, this.editForm.value)
        .subscribe(
          () => {
            alert('Event updated successfully!');
            this.loadEvents();
            this.closeEditModal();
          },
          (error) => {
            alert('Failed to update event.');
            console.error('Update failed', error);
          }
        );
    }
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(
        () => {
          alert('Event deleted successfully!');
          this.loadEvents();
        },
        (error) => {
          alert('Failed to delete event.');
          console.error('Delete failed', error);
        }
      );
    }
  }

  applyFilter(): void {
    // this.eventService.filterEventsByDate(this.filter).subscribe((events) => {
    //   this.events = events;
    // });
  }

  downloadReport(): void {
    // Convert events to CSV or other format and trigger download
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      this.events
        .map((event) =>
          [
            event.eventName,
            event.location,
            event.eventDateTime,
            event.assignedSinger?.name,
          ].join(',')
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'events_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
