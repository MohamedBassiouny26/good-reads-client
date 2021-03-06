
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/components/models/category';
import { AuthorService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  editBookForm!: FormGroup;
  categories!: any;
  authors: any;
  addBookForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]+")]),
    categoryId: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    sumary: new FormControl('', Validators.required),
    cover: new FormControl(null, Validators.required),
  });
  constructor(
    private bookService: BooksService,
    private categoryService: CategoryService,

    private authorSerice: AuthorService,
  ) { }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((res) => (this.categories = res.body));
    this.authorSerice
      .getAuthors()
      .subscribe((res) => (this.authors = res.body));
  }

  get formControls() {
    return this.addBookForm.controls
  }
  onFileChange(event: any) {
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (evt) => {
        if (evt.loaded === evt.total)
          this.addBookForm.patchValue({
            cover: reader.result
          });
      });
    }
  }
  addBook() {
    console.log(this.addBookForm.value.cover)
    this.bookService.addBook(this.addBookForm.value).subscribe((res) => {
      console.log(res);
    });
  }
}
