import { userModel } from "./userModel";

export interface courseModel{
    id:string;
    title:string;
    userId:string;
    user:userModel;
    students:userModel[];
    isActive:boolean;
    dateCreated:Date;
    price:number;
}