import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories:  Category[] = [
            { id: 1, nome:'Moradia' , description: 'Pagamento de Conta da Casa' },
            { id: 2, nome:'Saúde' , description: 'Plano de Saúde' },
            { id: 3, nome:'Lazer' , description: 'Cinema , parque' },
            { id: 4, nome:'Salário' , description: 'Recebimento de Salário' },
            { id: 5, nome:'Freelas' , description: 'Trabalho com freelancer ' },
        ];
        return { categories }
    }
    
}