import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from './file-upload.service';

@Component({
    selector: 'app-upload-images',
    template: `
<input #fileInput type="file" (change)="selectFiles($event)" accept="image/*" multiple style="display: none;" />

<div class="container" *ngIf="singleImage">
    <div class="row">
        <div class="col">
            <img *ngIf="mainImagePath"  [src]="mainImagePath" class="singleImageItem" />
        </div>
        <div class="col-auto" xxxstyle="height: 100px;">
            <button type="button" class="btn btn-primary btn-block" (click)="addImage()">Ajouter</button>
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
        </div>
        <div class="col-auto" xxxstyle="height: 100px;">
            <button type="button" class="btn btn-primary btn-block" (click)="addImage()">Ajouter</button>
        </div>
    </div>
</div>
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
