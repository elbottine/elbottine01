import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubActivityService } from './service';
import { ClubActivity } from './model';
import { AuthService } from '../auth/auth.service';
import { ModalGalleryRef, ModalGalleryService, Image, ModalGalleryConfig, PlainLibConfig, PlainGalleryStrategy, LineLayout, PlainGalleryConfig, GridLayout } from '@ks89/angular-modal-gallery';

@Component({
    template: `
<form #MyForm="ngForm" *ngIf="model">

<div class="container d-grid gap-5 my-5">

    <div class="d-flex my-2">
        <div class=""><h2>{{model.title}}</h2></div>
        <div class="ms-auto"><h2>{{model.date | dateFormat}}</h2></div>
    </div>

    <img *ngIf="mainImagePath" [src]="mainImagePath" class="singleImageItem" />

    <div class="card-text" [innerHTML]="model.text"></div>

    <ks-plain-gallery [id]="204" 
        [images]="images"
        [config]="libConfigPlainGalleryRowATags"
        (clickImage)="onShow(204, $event)">
    </ks-plain-gallery>
    
    <div class="d-flex align-items-end">
        <div class="text-muted">{{model.updatedBy}} - {{model.updatedAt | dateFormat: 'dt'}}</div>
        <div class="ms-auto">
            <button class="btn btn-primary" [routerLink]="['/club-activity', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
        </div>
    </div>

</div>

</form>
`,
    styles: ['.form-control.ng-touched.ng-invalid{border-color: red;}']
})
export class ClubActivityReadComponent implements OnInit {

    constructor(
        private clubActivityService: ClubActivityService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private modalGalleryService: ModalGalleryService
        )
    { }

    model: ClubActivity;
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
        this.clubActivityService
            .get(this.id)
            .subscribe((b: ClubActivity) => {
                let i = 0;
                this.model = b;
                this.images = b.paths.map(p =>
                    new Image(i++, { img: p }, { img: p })     
                );
                const regex = /\/main\.\w/;
                this.mainImagePath = b.paths.find(f => regex.test(f));
            });
    }

    canEdit(clubActivity: ClubActivity) {
        return clubActivity.id && this.authService.canEdit;
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