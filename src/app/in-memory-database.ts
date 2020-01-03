import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories:  Category[] = [
            { id: 1,name :'Saúde' , description: 'Plano de Saúde' },
            { id: 3,name :'Lazer' , description: 'Cinema , parque' },
            { id: 4,name :'Salário' , description: 'Recebimento de Salário' },
            { id: 5,name :'Freelas' , description: 'Trabalho com freelancer ' },
        ];
        return { categories }
    }
    
}