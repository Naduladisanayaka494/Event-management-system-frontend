import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service'; // Adjust the path
import jsPDF from 'jspdf';


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
  filterForm: FormGroup;

  constructor(
    private eventService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      eventDateTime: ['', Validators.required],
      assignedSingerId: ['', Validators.required],
    });

    this.filterForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      singerId: [''],
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

  filterEvents(): void {
    const { startDate, endDate, singerId } = this.filterForm.value;

    if (this.filterForm.valid) {
      if (startDate && endDate && singerId) {
        const formattedStartDate =
          new Date(startDate).toISOString().split('T')[0] + 'T00:00:00';
        const formattedEndDate =
          new Date(endDate).toISOString().split('T')[0] + 'T00:00:00';

        this.eventService
          .filterEventsByDateAndSinger(
            formattedStartDate,
            formattedEndDate,
            singerId
          )
          .subscribe(
            (filteredEvents) => {
              this.events = filteredEvents;
            },
            (error) => {
              alert('Failed to filter events.');
              console.error('Filter error', error);
            }
          );
      } else {
        this.eventService.getAllEvents().subscribe((res: any) => {
          this.events = res;
        });
      }
    }
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
  downloadReport(): void {
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(18);
    doc.text('Events Report', 14, 22);

    // Define column headers
    const headers = [
      'Event Name',
      'Location',
      'Date & Time',
      'Assigned Singer',
    ];
    const columnWidth = 40;
    const startY = 30;
    const rowHeight = 10;

    // Add headers
    let currentY = startY;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
      doc.text(header, 14 + index * columnWidth, currentY);
    });
    currentY += rowHeight;

    // Add rows
    doc.setFont('helvetica', 'normal');
    this.events.forEach((event) => {
      doc.text(event.eventName, 14, currentY);
      doc.text(event.location, 14 + columnWidth, currentY);
      doc.text(event.eventDateTime, 14 + 2 * columnWidth, currentY);

      // Add a small gap before Assigned Singer
      const gap = 10; // Adjust the gap size as needed
      doc.text(
        event.assignedSinger?.name || '',
        14 + 3 * columnWidth + gap,
        currentY
      );

      currentY += rowHeight;
    });

    // Save PDF
    doc.save('events_report.pdf');
  }
}
