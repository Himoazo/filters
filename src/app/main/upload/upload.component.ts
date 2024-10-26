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

  constructor(private imageService: ImageService) { }
  
  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploading(): void {
    if (this.selectedFile && this.imageName) {
      this.imageService.addImage(this.selectedFile, this.imageName).subscribe(response => {
        console.log("successful uploading", response);
        this.selectedFile = null;
        this.imageName = "";
      }, error => {
        console.error('Upload failed!', error);
      });
    }
  }
}
