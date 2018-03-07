export class PagingModel<T>{
    currentPage:number;
    totalRecords:number;
    startIndex:number;
    endIndex:number;      
    pages:number[]; 
    result:T;   
}
