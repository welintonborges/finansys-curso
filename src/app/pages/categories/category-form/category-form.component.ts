import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute , Router }  from '@angular/router';



import { CategoryService } from '../shared/category.service';

import { switchMap } from "rxjs/operators"

import toastr from "toastr";
import { Category } from '../shared/category.model';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html', 
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit , AfterContentChecked {


  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serveErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router : Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
   }

   ngAfterContentChecked(){
     this.setPageTitle();
   }

   submitForm(){
      this.submittingForm = true;

      if(this.currentAction == 'new')
          this.createCategory();
      else
          this.updateCategory();
   }

   private setCurrentAction(){
     if(this.route.snapshot.url[0].path == 'new')
        this.currentAction = 'new';
        else
        this.currentAction = 'edit';
        console.log("aqui -->", this.currentAction)
    }
      
      
      private buildCategoryForm(){
        this.categoryForm = this.formBuilder.group({
          id: [null],
          name: [null , [Validators.required, Validators.minLength(2)]],
          description: [null]
        });
      }
      
      private loadCategory(){
        if(this.currentAction == 'edit')
        
        this.route.paramMap.pipe(
          switchMap(params => this.categoryService.getById(+params.get('id')))
          )
          .subscribe(
            (category) => {
              this.category = category;
              this.categoryForm.patchValue(category)
            },
            (error) => alert('Ocorreu em erro no servidor , tente novamente mais tarde')
            )
      }

      private setPageTitle() {
          if(this.currentAction == 'new'){
            this.pageTitle = 'Cadastro de Nova Categoria'
          }else{
            const categoryName = this.category.name || ''
            this.pageTitle = 'Editando Categoria: ' + categoryName
          }
      }
     
      private createCategory() {
       const category: Category = Object.assign(new Category(), this.categoryForm.value);
       
       this.categoryService.create(category)
       .subscribe(
         category => this.actionsFormSucess(category),
         error => this.actionsFormError(error)
       )
      }
       
      private updateCategory() {
        const category: Category = Object.assign(new Category(), this.category);

        this.categoryService.update(category)
        .subscribe(
          category => this.actionsFormSucess(category),
          error => this.actionsFormError(error)
        )
      }
      
      private actionsFormSucess(category: Category){
         toastr.success('Solicitação processada com sucesso!');

         this.router.navigateByUrl('categories', {skipLocationChange: true }).then(
           () => this.router.navigate(['categories', category.id, 'edit'])
         )
         console.log( this.router);
      }

      private actionsFormError(error){
          toastr.error('Ocorreu um erro ao processar a sua solicitação');

          this.submittingForm = false;

          if(error.status == 442)
            this.serveErrorMessages = JSON.parse(error._body).errors;
         // ['Nome já existe', 'O e-mail não pode ficar em branco']
         else
            this.serveErrorMessages = ['Falha na comunicação com servidor. Por favor, tente novamente mais tarde.']
      }
}
