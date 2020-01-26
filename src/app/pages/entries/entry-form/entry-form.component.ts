import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute , Router }  from '@angular/router';


import { switchMap } from "rxjs/operators"

import toastr from "toastr";
import {Entry} from "../shared/entry.model";
import {EntryService} from "../shared/entry.service";




@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit , AfterContentChecked {


  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serveErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router : Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
   }

   ngAfterContentChecked(){
     this.setPageTitle();
   }

   submitForm(){
    console.log();
      this.submittingForm = true;

      if(this.currentAction == 'new')
          this.createEntry();
      else
          this.updateEntry();
   }

   private setCurrentAction(){
     if(this.route.snapshot.url[0].path == 'new')
        this.currentAction = 'new';
        else
        this.currentAction = 'edit';
        console.log("aqui -->", this.currentAction)
    }


      private buildEntryForm(){
        this.entryForm = this.formBuilder.group({
          id: [null],
          name: [null , [Validators.required, Validators.minLength(2)]],
          description: [null]
        });
      }

      private loadEntry(){
        if(this.currentAction == 'edit')

        this.route.paramMap.pipe(
          switchMap(params => this.entryService.getById(+params.get('id')))
          )
          .subscribe(
            (entry) => {
              this.entry = entry;
              this.entryForm.patchValue(entry)
            },
            (error) => alert('Ocorreu em erro no servidor , tente novamente mais tarde')
            )
      }

      private setPageTitle() {
          if(this.currentAction == 'new'){
            this.pageTitle = 'Cadastro de Nova entries'
          }else{
            const entryName = this.entry.name || ''
            this.pageTitle = 'Editando Entries: ' + entryName
          }
      }

      private createEntry() {
       const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

       this.entryService.create(entry)
       .subscribe(
         entry => this.actionsFormSucess(entry),
         error => this.actionsFormError(error)
       )
      }

      private updateEntry() {
        const entry: Entry = Object.assign(new Entry(), this.entryService);

        this.entryService.update(entry)
        .subscribe(
          entry => this.actionsFormSucess(entry),
          error => this.actionsFormError(error)
        )
      }

      private actionsFormSucess(entry: Entry){
         toastr.success('Solicitação processada com sucesso!');

         this.router.navigateByUrl('categories', {skipLocationChange: true }).then(
           () => this.router.navigate(['categories', entry.id, 'edit'])
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
