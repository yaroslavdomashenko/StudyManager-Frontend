export interface comment{
    id:string;
    dateCreated:Date;
    text:string;
    user: {
        login: string;
        avatar:string;
        name: string;
        surename:string;
    }
}