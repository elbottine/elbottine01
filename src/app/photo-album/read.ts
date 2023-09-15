import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoAlbumService } from './service';
import { PhotoAlbum } from './model';
import { AuthService } from '../auth/auth.service';
import { ModalGalleryRef, ModalGalleryService, Image, ModalGalleryConfig, PlainLibConfig, PlainGalleryStrategy, LineLayout, PlainGalleryConfig, GridLayout } from '@ks89/angular-modal-gallery';

@Component({
    template: `
<form #MyForm="ngForm" *ngIf="model">

<div class="container d-grid gap-5 my-5">

    <h1 class="my-4">Album photo</h1>

    <div class="row my-2">
        <div class="col-lg-10"><h2>{{model.title}}</h2></div>
        <div class="col-lg-2 ms-auto"><h4>{{model.date | dateFormat}}</h4></div>
    </div>

    <img *ngIf="mainImagePath" [src]="mainImagePath" class="singleImageItem" />

    <div class="shadow p-3 bg-body" [innerHTML]="model.text" *ngIf="model.text"></div>

    <ks-plain-gallery [id]="204" 
        [images]="images"
        [config]="libConfigPlainGalleryRowATags"
        (clickImage)="onShow(204, $event)">
    </ks-plain-gallery>
    
    <div class="row">
        <div class="col text-muted">{{model.updatedBy}} - {{model.updatedAt | dateFormat: 'dt'}}</div>
        <div class="col-lg-3 text-end">
            <button class="btn btn-primary" [routerLink]="['/photo-album', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
            <button class="btn btn-primary" routerLink="/photo-album/search">Fermer</button>		
        </div>
    </div>

</div>

</form>
`,
    styles: ['.form-control.ng-touched.ng-invalid{border-color: red;}']
})
export class PhotoAlbumReadComponent implements OnInit {

    constructor(
        private photoAlbumService: PhotoAlbumService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private modalGalleryService: ModalGalleryService
        )
    { }

    model: PhotoAlbum;
    id: string;
    mainImagePath: string;

    ngOnInit() {
        this.parseRouteParameters();
        this.get();
    }

    private parseRouteParameters() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    private get() {
        this.photoAlbumService
            .get(this.id)
            .subscribe((b: PhotoAlbum) => {
                let i = 0;
                this.model = b;
                this.images = b.paths.map(p =>
                    new Image(i++, { img: p }, { img: p })     
                );
                const regex = /\/main\.\w/;
                this.mainImagePath = b.paths.find(f => regex.test(f));
            });
    }

    canEdit(photoAlbum: PhotoAlbum) {
        return photoAlbum.id && this.authService.canEdit;
    }

    open(index: number): void {
        // open lightbox
        // var xxx = [<IAlbum> {
        //     src: this.model.paths[index],
        //     caption: '',
        //     thumb: this.model.paths[index]
        // }];
        //this._lightbox.open(xxx, 0);
    }
    
    close(): void {
        // close lightbox programmatically
        //this._lightbox.close();
    }
      
    images: Image[] = [];
    
    libConfigPlainGalleryRowATags: PlainLibConfig = {
        // plainGalleryConfig: {
        //     strategy: PlainGalleryStrategy.ROW,
        //    // layout: new GridLayout({width: '100px', height: '100px'}, {length: 4, wrap: true}, 'flex-start'),
        //     //advanced: {aTags: true, additionalBackground: '50% 50%/cover'}
        // } as PlainGalleryConfig
        plainGalleryConfig: {
            strategy: PlainGalleryStrategy.GRID,
            layout: new GridLayout({ width: 'auto', height: '200px' }, { length: 1, wrap: true } )
            
          }
    };
      
    onShow(id: number, index: number): void {
        const images: Image[] = this.images
        var params = { id, images, currentImage: images[index] };
        const dialogRef: ModalGalleryRef = this.modalGalleryService.open(params) as ModalGalleryRef;
    }
}
