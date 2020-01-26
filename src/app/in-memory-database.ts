import { InMemoryDbService } from "angular-in-memory-web-api";

import { Category } from './pages/categories/shared/category.model';
import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories:  Category[] = [
            { id: 1,name :'Saúde' , description: 'Plano de Saúde' },
            { id: 3,name :'Lazer' , description: 'Cinema , parque' },
            { id: 4,name :'Salário' , description: 'Recebimento de Salário' },
            { id: 5,name :'Freelas' , description: 'Trabalho com freelancer ' },
        ];

        const entries: Entry[] =[
          { id: 1 , name:'Gas de Cozinha', "categoryId": categories[0].id, category: categories[0], paid: true, date:"11/01/2020", amount: "70,80", type: "expense", description: "Qualquer coisas"} as Entry,
          { id: 2 , name:'Gas de Cozinha', "categoryId": categories[0].id, category: categories[0], paid: false, date:"11/01/2020", amount: "70,80", type: "revenue", description: "Qualquer coisas"} as Entry,
          { id: 3 , name:'Gas de Cozinha', "categoryId": categories[0].id, category: categories[0], paid: true, date:"11/01/2020", amount: "70,80", type: "expense", description: "Qualquer coisas"} as Entry,
          { id: 4 , name:'Gas de Cozinha', "categoryId": categories[0].id, category: categories[0], paid: false, date:"11/01/2020", amount: "70,80", type: "revenue", description: "Qualquer coisas"} as Entry



      ];
        return { categories, entries }
    }

}
