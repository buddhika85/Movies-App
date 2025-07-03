import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '../../functions/toBase64';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input-image',
  standalone: true,
  imports: [NgIf],
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.scss',
})
export class InputImageComponent {
  @Input({ required: true }) title!: string;
  imgBase64?: string | null = null;

  @Input()
  imageURL?: string;

  @Output()
  selectedFile: EventEmitter<File> = new EventEmitter<File>();

  change(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      toBase64(file)
        .then((base64String: string) => (this.imgBase64 = base64String)) // promise success

        // promise error
        .catch((error) =>
          console.log('Error occured while converting base 64 - ' + error)
        );
      this.selectedFile.emit(file);
      this.imageURL = undefined;
    }
  }
}
