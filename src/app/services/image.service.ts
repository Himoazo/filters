import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url: string = "https://computervision-production.up.railway.app/api/images/"; //länk till API

  constructor(private http: HttpClient) { }

  // Get images
  getImage(): Observable<Image[]> {
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };
    
    return this.http.get<Image[]>(this.url, {headers});
  }

  //GET image by ID, hämtar bilder i blob format 
  getImageId(id: number): Observable<Blob> {
    const token = localStorage.getItem("token");
    
    return this.http.get(this.url + id, {
      responseType: "blob",
      headers: { Authorization: "Bearer " + token }
    });
  }
  
  //POST Images, laddar upp bilder
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

  // DELETE image raderar bild
  deleteImg(id: number): Observable<Image>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.delete<Image>(this.url + id, {headers})
  }

  //PUT image redigerar bildsnamn
  editeImg(id: number, newName: string): Observable<string> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<string>(this.url + id, JSON.stringify(newName), { headers });
  }
}
