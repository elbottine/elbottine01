import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';

@Component({
    selector: 'app-upload-images',
    template: `
<div class="container" *ngIf="singleImage">
    <div class="row">
        <div class="col">
            <img *ngIf="mainImagePath" [src]="mainImagePath" class="singleImageItem" />
            <img *ngIf="!mainImagePath" style="height: 200px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E">
            <i class="fas fa-camera fa-10x"></i>
        </div>
        <div class="col-auto" xxxstyle="height: 100px;">
            <button type="button" class="btn btn-primary btn-block" (click)="addImage()"><i class="bi-camera"></i></button>

        </div>
    </div>
</div>
<div class="container" *ngIf="!singleImage">
    <div class="row">
        <div class="col">
            <div class="d-flex flex-wrap">
                <div class="imageBox"
                    *ngFor="let image of previews"
                    (click)="selectImage(image)"
                    [ngClass]="{'selected': isImageSelected(image)}">
                    <img [src]="image" class="imageItem" />
                </div>
            </div>
            <img *ngIf="!previews || !previews.length" style="height: 200px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E">
        </div>
        <div class="col-auto" xxxstyle="height: 100px;">
            <button type="button" class="btn btn-primary btn-block" (click)="addImage()"><i class="bi-camera"></i></button>
        </div>
    </div>
</div>
<input #fileInput type="file" (change)="selectFiles($event)" accept="image/*" multiple style="display: none;" />
`
})
export class UploadImagesComponent implements OnInit {

    imageItems: string[];
    selectedImage: string;
    mainImagePath: string;

    @Input()
    singleImage: boolean = true;

    @Input()
    previews: string[] = [];

    @ViewChild('fileInput', {static: true})
	fileInput: ElementRef;
    
    @Input()
    blogpostId: string;

    constructor(private uploadService: FileUploadService) { }

    ngOnInit(): void {
        if (!this.previews) {
            this.previews = [];
        }
        this.mainImagePath = this.getMainImagePath();
    }

    getMainImagePath(): string {
        const regex = /\/main\.\w/;
        return this.previews.find(f => regex.test(f));
    }

    selectFiles(event: any): void {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        if (this.singleImage) {
            const file = files[0];
            const fileName = "main." + file.name.split('.').pop();
            this.showImage(file);
            this.upload(file, fileName);
        }
        else {
            for (const file of files) {
                const fileName = file.name;
                this.showImage(file);
                this.upload(file, fileName);
            }
        }
    }

    showImage(file: File): void {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previews.push(e.target.result);
            this.mainImagePath = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    upload(file: File, fileName: string): void {
        if (file) {
            this.uploadService
                .upload(file, this.blogpostId, fileName, 0.25)
                .subscribe({
                    next: (event: any) => {
                        if (event.type === HttpEventType.UploadProgress) {
                        } else if (event instanceof HttpResponse) {
                        }
                    },
                    error: (err: any) => {
                    }
                });
        }
    }

    onClick($event: any): void {
        $event.stopPropagation();
		const input = this.fileInput.nativeElement;
		input.value = null;
		input.click();
	}

    addImage(): void {
		const input = this.fileInput.nativeElement;
		input.value = null;
		input.click();
	}

    selectImage(image: string): void {
        this.selectedImage = image === this.selectedImage ? null : image;
	}

    isImageSelected(image: string): boolean {
        return this.selectedImage === image;
	}   

    deleteSelectedImage(image: string): boolean {
        return this.selectedImage === image;
	}       
}
