import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FileModel } from '../models/file';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  public fileForm!: FormGroup;
  public loading = false;
  public imagePreview!: string;
  public errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private fileService: FileService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.fileForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required, 
        // mimeType
      ]
    });
  }

  onSubmit() {
    this.loading = true;
    const file = new FileModel('',
      new Date(),
      this.fileForm.get('title')?.value, 
      this.fileForm.get('description')?.value,
      '');
    this.fileService.postFileWithUpload(file, this.fileForm.get('image')?.value).then(
      () => {
        this.fileForm.reset();
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files![0]!;
    console.log('click', this.fileForm)
    this.fileForm.get('image')?.patchValue(file);
    this.fileForm.get('image')?.updateValueAndValidity();
    console.log('click', this.fileForm.get('image'))
    const reader = new FileReader();
    reader.onload = () => {
      if (this.fileForm.get('image')?.valid) {
        console.log('valid');
        this.imagePreview = reader.result as string;
      } else {
        console.log('invalid');
        this.imagePreview = '';
      }
    };
    reader.readAsDataURL(file);
  }

}
