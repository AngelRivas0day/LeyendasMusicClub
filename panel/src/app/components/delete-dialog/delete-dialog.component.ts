import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  itemType: string;
  name: any;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.itemType = this.data.itemType;
    this.name = this.data.name;
  }

  onNoClick(){
    this.dialogRef.close(false);
  }

  onDelete(){
    this.dialogRef.close(true);
  }

}
