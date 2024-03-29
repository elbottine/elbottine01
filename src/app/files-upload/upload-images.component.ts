import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
    selector: 'xyz-upload-images',
    template: `
<div class="container-fluid" *ngIf="singleImage">
    <div class="row">
        <div *ngIf="mainImagePath" class="col">
            <img [src]="mainImagePath" class="singleImageItem" />
        </div>
        <div *ngIf="!mainImagePath" class="col d-flex justify-content-center" style="background:#eee;">
            <i class="bi-camera bi-align-center" style="font-size:120px; color:#bbb;"></i>
        </div>
        <div class="col-auto" xxxstyle="height: 100px;">
            <button type="button" class="btn btn-primary btn-block" (click)="addImage()" [disabled]="!folder"><i class="bi-camera"></i></button>
            <button type="button" class="btn btn-primary btn-block" (click)="deleteMainImage()" [disabled]="!folder || !mainImagePath"><i class="bi-trash"></i></button>
        </div>
    </div>
</div>
<div class="container-fluid" *ngIf="!singleImage">
    <div class="row">
        <div *ngIf="previews && previews.length" class="col d-flex flex-wrap">
            <div class="imageBox"
                *ngFor="let image of previews"
                (click)="selectImage(image)"
                [ngClass]="{'selected': isImageSelected(image)}">
                <img [src]="image" class="imageItem" />
            </div>
        </div>
        <div *ngIf="!previews || !previews.length" class="col d-flex justify-content-center" style="background:#eee;">
            <i class="bi-camera bi-align-center" style="font-size:120px; color:#bbb;"></i>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-primary btn-block" (click)="addImage()" [disabled]="!folder"><i class="bi-camera"></i></button>
            <button type="button" class="btn btn-primary btn-block" (click)="deleteSelectedImage()" [disabled]="!folder || !selectedImagePath"><i class="bi-trash"></i></button>
        </div>
    </div>
</div>
<input #fileInput type="file" (change)="selectFiles($event)" accept="image/*" multiple style="display: none;" />
`
})
export class UploadImagesComponent implements OnInit {

    selectedImagePath: string;
    mainImagePath: string;

    @Input()
    singleImage: boolean = true;

    @Input()
    previews: string[] = [];

    @ViewChild('fileInput', {static: true})
	fileInput: ElementRef;
    
    @Input()
    folder: string;

    constructor(private uploadService: FileUploadService, private ref: ChangeDetectorRef) { }

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
            this.uploadImage(file, fileName, true);
        }
        else {
            for (const file of files) {
                const fileName = file.name;
                this.uploadImage(file, fileName, false);
            }
        }
    }

    showImage(file: File): void {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previews.push(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    uploadImage(file: File, fileName: string, main: boolean): void {
        this.uploadService
            .upload(file, this.folder, fileName, 0.25)
            .subscribe({
                next: imagePath => {
                    var index = this.previews.indexOf(imagePath);
                    if (index === -1) {
                        this.previews.push(imagePath);
                    }
                    if (main) {
                        this.mainImagePath = imagePath + "?"  + new Date().getTime();
                    }
                },
                error: (error: any) => {
                    alert(error.message);
                }
            });
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

    deleteMainImage(): void {
        var fileName = this.mainImagePath.split('/').pop();
        this.uploadService
            .delete(this.folder, fileName)
            .subscribe({
                next: _ => {
                    this.mainImagePath = null;
                },
                error: (error: any) => {
                    alert(error.message);
                }
            });
	}

    deleteSelectedImage(): void {
        var fileName = this.selectedImagePath.split('/').pop();
        this.uploadService
            .delete(this.folder, fileName)
            .subscribe({
                next: _ => {
                    var index = this.previews.indexOf(this.selectedImagePath);
                    if (index !== -1) {
                        this.previews.splice(index, 1);
                        this.previews = this.previews.map(x => x);
                    }
                    this.selectedImagePath = null;
                },
                error: (error: any) => {
                    alert(error.message);
                }
            });
	}

    selectImage(image: string): void {
        this.selectedImagePath = image === this.selectedImagePath ? null : image;
	}

    isImageSelected(image: string): boolean {
        return this.selectedImagePath === image;
	}   
}
