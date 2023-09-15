import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { PhotoAlbumService } from './service';
import { PhotoAlbum } from './model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../shared/toast-service';

@Component({
    template: `
<div class="container">

<h1 class="my-4">Album photos</h1>

<form #MyForm="ngForm" class="row g-4" *ngIf="model">
  
    <div class="col-md-8">
        <label for="title" class="form-label h3">Titre</label>
        <input type="text" class="form-control" 
                [placeholder]="'Entrer le titre ici...'" 
                id="title" name="title"
                [(ngModel)]="model.title"
                required />
    </div>
  
    <div class="col-md-4">
        <label for="date" class="form-label h3">Date</label>
        <div class="input-group">
            <input type="text" class="form-control"
                placeholder="dd/mm/yyyy"
                id="date" name="date"
                [(ngModel)]="model.date"
                ngbDatepicker
                #d="ngbDatepicker"
            />
            <button class="btn btn-outline-secondary bi bi-calendar3" (click)="d.toggle()" type="button"></button>
        </div> 
    </div>

    <div class="col-12">
        <label for="title" class="form-label h3">Photo principale (optionnel)</label>
        <div class="input-group">
            <app-upload-images class="w-100"
                [folder]="id" 
                [previews]="model.paths"
                [singleImage]=true>
            </app-upload-images>
        </div>
    </div>

    <div class="col-12">
        <label for="title" class="form-label h3">Information</label>
        <div class="input-group">
            <angular-editor class="w-100"
                [placeholder]="'Entrer le texte ici...'"
                style="min-height: 250px;"
                [(ngModel)]="model.text"
                id="text" name="text">
            </angular-editor>        
        </div>
    </div>

    <div class="col-12">
        <label for="title" class="form-label h3">Photos (optionnel)</label>
        <div class="input-group">
            <app-upload-images class="w-100"
                [folder]="id"
                [previews]="model.paths"
                [singleImage]=false>
            </app-upload-images>
        </div>
    </div>

    <div class="col-12 d-flex align-items-end mb-4">
        <div class="text-muted">{{model?.createdBy}} - {{model?.updatedAt | dateFormat }}</div>
        <div class="ms-auto">
            <button class="btn btn-danger" (click)="delete()">Suprimer</button>
            <button class="btn btn-primary" [routerLink]="['/photo-album', 'read', id]" [disabled]="!id">Visualiser</button>		
            <button class="btn btn-primary" [disabled]="!model || !dirty || !MyForm.valid" (click)="apply()">Sauver</button>
            <button class="btn btn-primary" routerLink="/photo-album/search">Fermer</button>		
        </div>
    </div>  

</form>
</div>
`})
export class PhotoAlbumEditComponent implements OnInit {

    constructor(
        private photoAlbumService: PhotoAlbumService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private toastService: ToastService
    ) { }

    private modelCopy: PhotoAlbum;
    model: PhotoAlbum;
    id: string = null;

    ngOnInit() {
        this.parseRouteParameters();
        this.get();
    }

    private parseRouteParameters() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    private get() {
        if (this.id) {
            this.photoAlbumService
                .get(this.id)
                .subscribe((model: PhotoAlbum) => {
                    this.modelCopy = model.clone();
                    this.model = model;
                });
        } else {
            const model = new PhotoAlbum();
            model.createdBy = this.authService.user.name;
            model.createdAt = new Date().toISOString();
            this.modelCopy = model.clone();
            this.model = model;
        }
    }

    apply(): void {
        const model = this.model.clone();
        model.updatedBy = this.authService.user.name;
        model.updatedAt = new Date().toISOString();
        this.photoAlbumService.upsert(model).subscribe({
            next: model => {
                this.modelCopy = model.clone();
                this.model = model;
                this.id = model.id;
                debugger;
                this.toastService.success('texte sauvegardée');
            },
            error: (error: any) => {
                error = error.error || error;
                const message = error.ExceptionMessage || error.message || error.Message;
                this.toastService.error(message, 'Erreur technique');
            },
            complete: () => console.info('complete')
        });
    }

    delete(): void {
        this.dialogService.confirm('Confirmation', "Suprimer l'album ?")
            .then(result => {
                if (result) {
                    this.deletePhotoAlbum();
                }
            });
    }

    deletePhotoAlbum(): void {
        this.photoAlbumService.delete(this.model.id)
            .subscribe(
                (_: any) => {
                    this.router.navigate(['photo-album/search'])
                    this.toastService.success('Album suprimée');
                }
            );
    }

    updateMainImage(imagePath: string) {
        this.model.mainImagePath = imagePath;
    }

    updateImageLigt(imagePaths: string[]) {
        this.model.paths = imagePaths;
    }

    get dirty(): boolean {
        const m: any = this.model;
        const c: any = this.modelCopy;
        return Object.keys(this.model).some(p => m[p] !== c[p]);
    }

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '500px',
        // placeholder: 'Enter text here...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
            ['bold']
        ],
        customClasses: [
            {
                name: "quote",
                class: "quote",
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: "titleText",
                class: "titleText",
                tag: "h1",
            },
        ]
    };
}
