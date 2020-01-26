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
          { id: 2 , name:'Jantar', "categoryId": categories[1].id, category: categories[1], paid: false, date:"11/02/2021", amount: "30,80", type: "revenue", description: "Qualquer desta "} as Entry,
          { id: 3 , name:'Almoço', "categoryId": categories[2].id, category: categories[2], paid: true, date:"11/06/2022", amount: "15,80", type: "expense", description: "Qualquer mesma "} as Entry,
          { id: 4 , name:'Lazer', "categoryId": categories[3].id, category: categories[3], paid: false, date:"11/10/2010", amount: "20,80", type: "revenue", description: "Qualquer outra"} as Entry



      ];
        return { categories, entries }
    }

}
