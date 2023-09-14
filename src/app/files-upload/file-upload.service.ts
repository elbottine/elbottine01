import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

    constructor(private httpClient: HttpClient) { }

    upload(file: File, folder: string, fileName: string, quality: number): Observable<string> {
        alert(file.size);
        if (file.size < 333333)
        {
            return this.post(file, folder, fileName);
        }
        return from(createImageBitmap(file)).pipe(
            map(this.getCanvas),
            switchMap(canvas => this.toBlob(canvas, file.name, file.type, quality)),            
            switchMap(blob => this.post(blob, folder, fileName))
        );        
    }

    // public uploadFile<T>(file: File): Observable<T> {
    //     let formData = new FormData();
    //     formData.append('file', file, file.name);
    //     var request = this.httpClient.post<T>("url/to/backend/upload", formData);
    //     return request;
    // }

    delete(folder: string, fileName: string): Observable<string> {
        return this.httpClient.delete(`api/blob/${folder}/${fileName}`, {responseType: 'text'});
    }    

    private post(blob: Blob, folder: string, fileName: string): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('file', blob);
        // const req = new HttpRequest('POST', `api/blob/${folder}/${fileName}`, formData, {
        //     //reportProgress: true,
        //     //responseType: 'json'
        // });
        // return this.httpClient.request(req);
        return this.httpClient.post(`api/blob/${folder}/${fileName}`, formData, {responseType: 'text'});
    }

    private toBlob(canvas: HTMLCanvasElement, fileName: string, fileType: string, quality: number): Observable<File> {
        return new Observable<File>(observer => {
            canvas.toBlob(blob => {
                var f = new File([blob], fileName,  { type: fileType });
                observer.next(f);
                observer.complete();
            }, fileType, quality);
        });
    };

    private getCanvas(bitmap: ImageBitmap): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        var width = bitmap.width; 
        var height = bitmap.height;
        var r = Math.max(width / 1200, height / 1200);
        if (r <= 1) {
            canvas.width = width;
            canvas.height = height;
        }
        else {
            canvas.width = width / r;
            canvas.height = height / r;
        }
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        return canvas;
    }
}
