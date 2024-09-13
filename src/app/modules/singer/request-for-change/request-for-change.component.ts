import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-request-for-change',
  templateUrl: './request-for-change.component.html',
  styleUrls: ['./request-for-change.component.scss']
})
export class RequestForChangeComponent implements OnInit {

  events: any[] = [];
  singers: any[] = [];

  filter = { startDate: '', endDate: '', singerId: '' };
  selectedEvent: any = null;
  editForm: FormGroup;
  filterForm: FormGroup;

  constructor(
    private eventService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private storageservice:StorageService
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

  }

  loadEvents(): void {
    this.eventService.getEventsBySingerId().subscribe((events) => {
      this.events = events;
    });
  }


  filterEvents(): void {
    this.spinner.show()
    const { startDate, endDate, singerId } = this.filterForm.value;
    if (this.filterForm.valid && startDate && endDate) {
      const formattedStartDate =
        new Date(startDate).toISOString().split('T')[0] + 'T00:00:00';
      const formattedEndDate =
        new Date(endDate).toISOString().split('T')[0] + 'T00:00:00';
      this.eventService
        .filterEventsByDateAndSingerstatic(
          formattedStartDate,
          formattedEndDate,
          singerId
        )
        .subscribe(
          (filteredEvents) => {
            this.events = filteredEvents;
            this.spinner.hide();
          },
          (error) => {
            alert('Failed to filter events.');
            this.spinner.hide();
            console.error('Filter error', error);
          }
        );
    } else {
      alert('Please fill in both the start and end dates.');
      this.spinner.hide();
    }
  }


  downloadReport(): void {
    const doc = new jsPDF();


    doc.setFontSize(18);
    doc.text('Events Report', 14, 22);
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

  resetFilters(): void {
    this.filterForm.reset({
      startDate: '',
      endDate: '',
      singerId: '',
    });
    this.loadEvents();
  }

}
