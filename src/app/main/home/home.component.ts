import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  images: Image[] = [];
  imageUrls: {id: number, url: string, imgName: string}[] = [];
  constructor(private imageService: ImageService) { }
  
  ngOnInit() {
    this.imageService.getImage().subscribe(data => {
      this.images = data;

      for (let image of this.images) {
        this.fetchImages(image.id, image.imageName);
      }
    });
  }

  fetchImages(id: number, imgName: string): void {
    this.imageService.getImageId(id).subscribe((data: Blob) => {
      const imageUrl = URL.createObjectURL(data);
      this.imageUrls?.push({id, url: imageUrl, imgName});
    });
  }

  deleteImage(id: number):void {
    this.imageService.deleteImg(id).subscribe(response => {
    
    this.imageUrls = this.imageUrls.filter(image => image.id != id);
    });
  }


  editImage(id: number, event: FocusEvent): void {
    const newName = (event.target as HTMLElement).innerText.trim();
    if (newName == null || newName.length > 30 || id == null) {
      console.log("wrong id or name");
    } else {
      this.imageService.editeImg(id, newName).subscribe(response => { 
        console.log(response);
      });
    }
  }
}
