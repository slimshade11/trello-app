import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  data = this.config.data;

  constructor(private config: DynamicDialogConfig) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
