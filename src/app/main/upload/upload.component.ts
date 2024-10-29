import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  selectedFile: File | null = null;
  imageName: string = "";
  selectedFilter: number = 0;

  filters = [
    { name: "Sobel", value: 0 },
    { name: "Blur", value: 1 },
    { name: "Reflect", value: 2 },
    { name: "Grayscale", value: 3}
  ];
  constructor(private imageService: ImageService) { }

  
  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  result: string = "";
  uploading(): void {
    if (this.selectedFile && this.imageName) {
      this.imageService.addImage(this.selectedFile, this.imageName, this.selectedFilter).subscribe(response => {
        this.selectedFile = null;
        this.imageName = "";
        this.result = "Bilden är uppladdad och behandlad";
      }, error => {
        this.result = "Det gick inte att ladda upp bilden. Kontrollera att du har rätt storelk och format på bilden";
      });
    }
  }
}
