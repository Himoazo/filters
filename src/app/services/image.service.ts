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
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };
    
    return this.http.get<Image[]>(this.url, {headers});
  }

  //Get image by ID
  getImageId(id: number): Observable<Blob> {
    const token = localStorage.getItem("token");
    
    
    return this.http.get(this.url + id, {
      responseType: "blob",
      headers: { Authorization: "Bearer " + token }
    });
  }
  
  //Add Images
  addImage(imageFile: File, imageName: string, filter: number): Observable<any>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    const uploadedImg: FormData = new FormData();
    uploadedImg.append("ImageFile", imageFile);
    uploadedImg.append("ImageName", imageName);
    uploadedImg.append("ImageUrl", "default");
    uploadedImg.append("Filter", filter.toString());
    return this.http.post<Image>(this.url, uploadedImg, {headers});
  }

  // Delete image
  deleteImg(id: number): Observable<Image>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.delete<Image>(this.url + id, {headers})
  }

  //Edit image
  editeImg(id: number, newName: string): Observable<string>{
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: "Bearer" + token
  });
    return this.http.put<string>(this.url + id, JSON.stringify(newName), {headers});
  }
}
