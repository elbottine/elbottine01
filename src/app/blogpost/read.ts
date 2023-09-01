import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { BlogpostService } from './service';
import { Blogpost } from './model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ModalGalleryRef, ModalGalleryService, Image, ModalGalleryConfig, PlainLibConfig, PlainGalleryStrategy, LineLayout, PlainGalleryConfig, GridLayout } from '@ks89/angular-modal-gallery';
//import { IAlbum, Lightbox } from 'ngx-lightbox';

@Component({
    template: `
<form #MyForm="ngForm" *ngIf="model">

<div class="container d-grid gap-5 my-5">

    <h2 class="my-3">{{model.title}}</h2>

    <img *ngIf="mainImagePath"  [src]="mainImagePath" class="singleImageItem" />

    <div class="card-text" [innerHTML]="model.text"></div>

    <ks-plain-gallery [id]="204" 
        [images]="images"
        [config]="libConfigPlainGalleryRowATags"
        (clickImage)="onShow(204, $event)">
    </ks-plain-gallery>
    
    <div class="d-flex align-items-end">
        <div class="text-muted">{{model.createdBy}} - {{model.createdAtDate}}</div>
        <div class="ms-auto">
            <button class="btn btn-outline-primary" [routerLink]="['/blogpost', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
        </div>
    </div>        

</div>

</form>
`,
    styles: [`.form-control.ng-touched.ng-invalid{border-color: red;}`,
    `
	.imgcontainer {
	  max-width: 1170px;
	  width: 100%;
	  padding-right: 15px;
	  padding-left: 15px;
	  margin-right: auto;
	  margin-left: auto;
	}

	.imgcontainer .gallery img {
	  float: left;
	  //width: 20%;
	  //height: auto;
      max-width: 200px;
      max-height: 200px;
	 // border: 2px solid #fff;
	  -webkit-transition: -webkit-transform .15s ease;
	  -moz-transition: -moz-transform .15s ease;
	  -o-transition: -o-transform .15s ease;
	  -ms-transition: -ms-transform .15s ease;
	  transition: transform .15s ease;
	  position: relative;
	}
  `]
})
export class BlogpostReadComponent implements OnInit {

    constructor(
        private blogpostService: BlogpostService,
        private activatedRoute: ActivatedRoute,
        private accountService: AuthService,
        // private _lightbox: Lightbox
        private modalGalleryService: ModalGalleryService
        )
    { }

    model: Blogpost;
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
        this.blogpostService
            .get(this.id)
            .subscribe((b: Blogpost) => {
                let i = 0;
                this.model = b;
                this.images = b.paths.map(p =>
                    new Image(i++, { img: p }, { img: p })     
                );
                const regex = /\/main\.\w/;
                this.mainImagePath = b.paths.find(f => regex.test(f));
            });
    }

    canEdit(blogpost: Blogpost) {
        return blogpost.id && this.accountService.isLogged;
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
