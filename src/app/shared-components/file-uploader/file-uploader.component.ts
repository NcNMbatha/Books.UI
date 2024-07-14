import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [MatGridListModule,
            MatIconModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {
  public listOfFilesUrls: any[] = [];
  showDemoImages: boolean = false;

  public constructor() {}

  ngOnInit(): void {}

  onSeletectedFiles(files: any) {
    if (files.length === 0) return;

    for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
      var reader = new FileReader();
      let filename = files[fileIndex].name;

      reader.readAsDataURL(files[fileIndex]);
      reader.onload = (event: any) => {
        this.listOfFilesUrls.push({
          id: 0,
          fileName: filename,
          fileData: event.target.result,
        });
      };
    }
  }
}
