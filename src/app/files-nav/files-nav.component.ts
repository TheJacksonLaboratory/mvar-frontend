import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { UploadService } from './upload.service';
import { FilesService} from './files.service';
import { File} from '../models';

@Component({
  selector: 'app-files-nav',
  templateUrl: './files-nav.component.html',
  styleUrls: ['./files-nav.component.css']
})
export class FilesNavComponent implements OnInit {

  isThereFileChanges: boolean;

  constructor(public dialog: MatDialog, public uploadService: UploadService, private fileService: FilesService) {

    this.uploadService.isThereFileChanges.subscribe( value => {
        this.isThereFileChanges = value;
        if (value) {
          this.getNewFiles();
        }

      });
  }

  files: File[];
  vcfFiles: File[];
  processedFiles: File[];
  metadataFiles: File[];

  selectedFiles: string[] = [];

  ngOnInit() {

    this.getNewFiles();
  }


  public openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%' });
  }

  getNewFiles(): void {

    this.fileService.getNewFiles().subscribe(data => {

      this.files = data.uploadedFiles;
      this.getProcessedFiles();
      this.getVcfFiles();
      this.getMetadataFiles();
    });

    console.log('getting all files');
  }

  getProcessedFiles(): void {

    this.fileService.getProcessedFiles().subscribe(data => {

      this.processedFiles = data.uploadedFiles;
    });

    console.log('getting all files');
  }

  getVcfFiles() {

    this.vcfFiles = this.files.filter(file => file.extension === 'vcf');
  }

  getMetadataFiles() {

    this.metadataFiles = this.files.filter(file => file.extension === 'xlsx');
  }

  downloadFile(id: string) {

    this.fileService.downloadFile(id);

  }

  deleteFile(id: string) {

    this.fileService.deleteFile(id).subscribe(data => {
        this.getNewFiles();
    });

  }

  selectFile(checked: boolean, id: string) {

    const indx = this.selectedFiles.indexOf(id);
    console.log(indx);
    //
    if (checked) {
      if (indx == -1) {
        this.selectedFiles.push(id);
      }
    } else {

      if (indx != -1) {
        this.selectedFiles.splice(indx, 1);
      }
    }
    //console.log(this.selectedFiles)
  }

}
