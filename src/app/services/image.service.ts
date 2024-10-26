import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url: string = "http://localhost:5258/api/images/";
  constructor(private http: HttpClient) { }

  // Get images
  getImage(): Observable<Image[]> {
    return this.http.get<Image[]>(this.url);
  }

  //Get image by ID
  getImageId(id: number): Observable<Blob> {
    return this.http.get(this.url + id, {responseType: "blob"});
  }
  
  //Add Images
  addImage(imageFile: File, imageName: string): Observable<any>{
    const uploadedImg: FormData = new FormData();
    uploadedImg.append("ImageFile", imageFile);
    uploadedImg.append("ImageName", imageName);
    uploadedImg.append("ImageUrl", "default");
    return this.http.post<Image>(this.url, uploadedImg);
  }

  // Delete image
  deleteImg(id: number): Observable<Image>{
    return this.http.delete<Image>(this.url + id)
  }

  //Edit image
  editeImg(id: number, newName: string): Observable<string>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
    return this.http.put<string>(this.url + id, JSON.stringify(newName), {headers});
  }
}
