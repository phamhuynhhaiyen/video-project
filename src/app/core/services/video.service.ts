import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environment';

const API_URL = `http://${environment.apiKey}/videos`

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  getAllVideos(): Observable<any> {
    return this.http.get(API_URL)
  }

  public getVideo(id: string): Observable<SafeUrl> {
    // const params = new HttpParams().set('id', id);
    return this.http
      .get(`${API_URL}/${id}/stream`, { responseType: 'arraybuffer' })
      .pipe(
        map((video) => {
          const blob = new Blob([video], { type: 'video/mp4' });

          return this.domSanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(blob)
          );
        })
      );
  }

  uploadVideo(fileInput: File) {
    let formParams = new FormData();
    formParams.append('file', fileInput)
    // const req = new HttpRequest('POST', `${API_URL}/upload`, formParams, {
    //   reportProgress: true,
    //   responseType: 'json'
    // })
    return this.http.post(`${API_URL}/upload`, formParams);
    // return this.http.request(req)
  }

}
