import {Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material';
import {UploadDialogComponent} from './upload-dialog/upload-dialog.component';
import {UploadService} from './upload.service';
import {FilesService} from './files.service';
import {File} from '../models';
import {Router} from '@angular/router';

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
    errorFiles: File[];
    metadataFiles: File[];
    isSelectedSNPFiles = false;
    isSelectedSVFiles = false;
    selectAllSNPFiles = false;
    selectAllSvFiles = false;

    selectedTab = 0;

    constructor(public dialog: MatDialog, public uploadService: UploadService, private fileService: FilesService, private router: Router) {

        this.uploadService.isThereFileChanges.subscribe(value => {
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
        const dialogRef = this.dialog.open(UploadDialogComponent, {
            width: '50%',
            height: '50%',
            data: {fileType: 'vcf', titleText: 'Upload VCF Files'}
        });
    }

    public openSampleUploadDialog() {
        const dialogRef = this.dialog.open(UploadDialogComponent, {
            width: '50%',
            height: '50%',
            data: {fileType: 'sample', titleText: 'Upload Samples Metadata File'}
        });

    }

    getNewFiles(): void {

        this.fileService.getNewFiles().subscribe(data => {

            this.files = data.uploadedFiles;
            this.getProcessedFiles();
            this.getPendingdFiles();
            this.getErrorFiles();
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

    getErrorFiles(): void {

        this.fileService.getErrorFiles().subscribe(data => {

            this.errorFiles = data.uploadedFiles;
        });

        console.log('getting all files');
    }

    getVcfFiles() {

        this.snpVcfFiles = this.files.filter(file => file.extension === 'vcf' && file.varType === 'SNP_INDEL');
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

    selectSNPFile(checked: boolean, file: any) {

        file.selected = checked;

        const selectedFiles = this.snpVcfFiles.filter(file => file.selected === true);
        this.isSelectedSNPFiles = (selectedFiles.length > 0)

    }

    selectSVFile(checked: boolean, file: any) {
        file.selected = checked;

        const selectedFiles = this.svVcfFiles.filter(file => file.selected === true);
        this.isSelectedSVFiles = (selectedFiles.length > 0)

    }

    submitSNPLoad() {
        const selectedFiles = this.snpVcfFiles.filter(file => file.selected === true);
        console.log('selected snp files = ' + selectedFiles.length)
        if (selectedFiles.length > 0) {


            selectedFiles.forEach(file => {
                console.log('we are here')
                this.fileService.loadVcfFiles([file.name], 'SNP_INDEL').subscribe(data => {
                   //do nothing
                });
            });
            //reload this component
            this.selectedTab = 1;
            this.delay(2000).then(any => {
                //task after delay.
                this.getNewFiles();
            });
        }
    }


    submitSVLoad() {

        const selectedFiles = this.svVcfFiles.filter(file => file.selected === true);
        console.log('selected sv files = ' + selectedFiles.length)
        if ( selectedFiles.length > 0){
            selectedFiles.forEach(file =>{
                this.fileService.loadVcfFiles([file.name], 'SV').subscribe(data => {
                    //do nothing
                });
            });

            //reload this component
            this.selectedTab = 1;
            this.delay(2000).then(any => {
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
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }

    selectAllSNPChecks(){
        if (! this.selectAllSNPFiles) {
            this.snpVcfFiles.forEach(file =>{
                file.selected = true;
            });
            this.selectAllSNPFiles = true;
            this.isSelectedSNPFiles = true;
        } else {
            this.snpVcfFiles.forEach(file =>{
                file.selected = false;
            });
            this.selectAllSNPFiles = false;
            this.isSelectedSNPFiles = false;
        }
    }

    selectAllSVChecks(){
        if (! this.selectAllSvFiles) {
            this.svVcfFiles.forEach(file => {
                file.selected = true;
            });
            this.selectAllSvFiles = true;
            this.isSelectedSVFiles = true;
        } else {
            this.svVcfFiles.forEach(file => {
                file.selected = false;
            });
            this.selectAllSvFiles = false;
            this.isSelectedSVFiles = false;
        }
    }

}
