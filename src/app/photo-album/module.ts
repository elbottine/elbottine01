import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { PhotoAlbumEditComponent } from './edit';
import { SearchResultComponent } from './result';
import { PhotoAlbumSearchComponent } from './search';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PhotoAlbumReadComponent } from './read';
import { UploadImagesModule } from '../files-upload/module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
        path: 'photo-album/search',
        component: PhotoAlbumSearchComponent,
        //canActivate: [AuthorizationGuard]
    },
    {
        path: 'photo-album/read/:id',
        component: PhotoAlbumReadComponent,
    },
    {
        path: 'photo-album/edit',
        component: PhotoAlbumEditComponent,
    },
    {
        path: 'photo-album/edit/:id',
        component: PhotoAlbumEditComponent,
    }			
];

@NgModule({
    declarations: [
        PhotoAlbumSearchComponent,
        SearchResultComponent,
        PhotoAlbumEditComponent,
        PhotoAlbumReadComponent
    ],
    exports: [
        RouterModule,
        AngularEditorModule,
        SearchResultComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        UtilsModule,
        UploadImagesModule,
        AngularEditorModule,
        GalleryModule,
        RouterModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class PhotoAlbumModule {}
