import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { ClubActivityEditComponent } from './edit';
import { SearchResultComponent } from './result';
import { ClubActivitySearchComponent } from './search';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ClubActivityReadComponent } from './read';
import { UploadImagesModule } from '../files-upload/module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
        path: 'club-activity/search',
        component: ClubActivitySearchComponent,
        //canActivate: [AuthorizationGuard]
    },
    {
        path: 'club-activity/read/:id',
        component: ClubActivityReadComponent,
    },
    {
        path: 'club-activity/edit',
        component: ClubActivityEditComponent,
    },
    {
        path: 'club-activity/edit/:id',
        component: ClubActivityEditComponent,
    }			
];

@NgModule({
    declarations: [
        ClubActivitySearchComponent,
        SearchResultComponent,
        ClubActivityEditComponent,
        ClubActivityReadComponent
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
export class ClubActivityModule {}
