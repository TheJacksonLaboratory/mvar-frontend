import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { UploadService } from './upload.service';
import { FilesService} from './files.service';
import { File} from '../models';
import { Router} from '@angular/router';

@Component({
  selector: 'app-files-nav',
  templateUrl: './files-nav.component.html',
  styleUrls: ['./files-nav.component.css']
})
export class FilesNavComponent implements OnInit {

  isThereFileChanges: boolean;

  files: File[] = [];
  snpVcfFiles: File[];
  svVcfFiles: File[];
  processedFiles: File[];
  pendingFiles: File[];
  metadataFiles: File[];

  selectedSNPFiles: string[] = [];
  selectedSVFiles: string[] = [];
  selectedTab = 0;


  constructor(public dialog: MatDialog, public uploadService: UploadService, private fileService: FilesService, private router: Router) {

    this.uploadService.isThereFileChanges.subscribe( value => {
        this.isThereFileChanges = value;
        if (value) {
          this.getNewFiles();
        }

      });
  }

  ngOnInit() {

    this.getNewFiles();
  }


  public openVcfUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%',data:{fileType:'vcf', titleText:'Upload VCF Files'} });
  }

  public openSampleUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%', data:{fileType:'sample', titleText:'Upload Samples Metadata File'} });

  }

  getNewFiles(): void {

    this.fileService.getNewFiles().subscribe(data => {

      this.files = data.uploadedFiles;
      this.getProcessedFiles();
      this.getPendingdFiles();
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

  getPendingdFiles(): void {

      this.fileService.getPendingFiles().subscribe(data => {

          this.pendingFiles = data.uploadedFiles;
      });

      console.log('getting all files');
  }

  getVcfFiles() {

    this.snpVcfFiles = this.files.filter(file => file.extension === 'vcf' && file.varType === 'SNP&INDEL');
    this.svVcfFiles = this.files.filter(file => file.extension === 'vcf' && file.varType === 'SV');
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

  selectSNPFile(checked: boolean, id: string) {

    const indx = this.selectedSNPFiles.indexOf(id);
    console.log(indx);
    //
    if (checked) {
      if (indx == -1) {
        this.selectedSNPFiles.push(id);
      }
    } else {

      if (indx != -1) {
        this.selectedSNPFiles.splice(indx, 1);
      }
    }
    //console.log(this.selectedSNPFiles)
  }

  selectSVFile(checked: boolean, id: string) {

        const indx = this.selectedSVFiles.indexOf(id);
        console.log(indx);
        //
        if (checked) {
            if (indx == -1) {
                this.selectedSVFiles.push(id);
            }
        } else {

            if (indx != -1) {
                this.selectedSVFiles.splice(indx, 1);
            }
        }
        //console.log(this.selectedSNPFiles)
    }

  submitSNPLoad(){
    if (this.selectedSNPFiles.length > 0) {
        console.log("Files to load = " + this.selectedSNPFiles)

        this.fileService.loadVcfFiles(this.selectedSNPFiles, 'SNP&INDEL').subscribe(data => {
          //do nothing
            this.selectedTab = 2;
            this.getNewFiles();
        });

        //reload this component
        //this.redirectTo(this.router.url);
        this.selectedTab = 1;
        this.delay(2000).then(any=>{
            //task after delay.
            this.getNewFiles();
        });
    }
  }

    submitSVLoad(){
        if (this.selectedSVFiles.length > 0) {
            console.log("Files to load = " + this.selectedSNPFiles)

            this.fileService.loadVcfFiles(this.selectedSVFiles, 'SV').subscribe(data => {
                //do nothing
                this.selectedTab = 2;
                this.getNewFiles();
            });

            //reload this component
            //this.redirectTo(this.router.url);
            this.selectedTab = 1;
            this.delay(2000).then(any=>{
                //task after delay.
                this.getNewFiles();
            });
        }
    }

  redirectTo(uri) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  async delay(ms: number) {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
}
