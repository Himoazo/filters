import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { FormControl, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  selectedFile: File | null = null;
  imageName: string = "";
  selectedFilter: number = 0;

  filters = [
    { name: "Edges", value: 0 },
    { name: "Blur", value: 1 },
    { name: "Reflect", value: 2 },
    { name: "Grayscale", value: 3}
  ];
  constructor(private imageService: ImageService, private _snackBar: MatSnackBar) { }

  
  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

 
  spin: boolean = false;
  uploading(): void {
    this.spin = true;
    if (this.selectedFile && this.imageName) {
      this.imageService.addImage(this.selectedFile, this.imageName, this.selectedFilter).subscribe(response => {
        this.selectedFile = null;
        this.imageName = "";
        this.openSnackBar("Bilden är uppladdad, behandlad och finns under 'Bilder' fliken");
        this.spin = false;
      }, error => {
        this.openSnackBar("Det gick inte att ladda upp bilden. Kontrollera att du har rätt storelk och format på bilden");
        this.spin = false;
      });
    } else {
      this.openSnackBar("Du måste välja fil och ange bildnamn");
      this.spin = false;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "X", {
      duration: 5000
    });
  }
}
