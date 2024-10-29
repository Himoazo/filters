import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private imageService: ImageService, private _snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.imageService.getImage().subscribe(data => {
      this.images = data;

      for (let image of this.images) {
        this.fetchImages(image.id, image.imageName);
      }
    });
  }


  fetchImages(id: number, imgName: string): void {
    this.imageService.getImageId(id).subscribe({
      next: (data: Blob) => {
        const imageUrl = URL.createObjectURL(data);
        this.imageUrls?.push({id, url: imageUrl, imgName});
      }, 
      error: (err) => {
        this.openSnackBar("Det gick inte att hämta sparade bilder");
      }
    });
  }

  deleteImage(id: number): void {
    if (confirm("Är du säker att du vill radera bilden?") == true) {
    this.imageService.deleteImg(id).subscribe({
      next: (response) => {
        this.imageUrls = this.imageUrls.filter(image => image.id != id);
        this.openSnackBar("Bilden är raderad");
      },
      error: (err) => {
        this.openSnackBar("Det gick inte att ändra bildnamnet");
      }
    });
  } else {
    return;
  }
  }


  editImage(id: number, event: FocusEvent): void {
    const newName = (event.target as HTMLElement).innerText.trim();
    if (!newName || newName.length > 30) {
      this.openSnackBar("Namnet ska vara 1 - 30 bokstäver");
    } else {
      this.imageService.editeImg(id, newName).subscribe({
        next: () => {
          this.openSnackBar(`Bilden heter nu ${newName}`);
        },
        error: () => {
          this.openSnackBar("Det gick inte att ändra bildnamnet");
        }
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "X", {
      duration: 5000
    });
  }
}
