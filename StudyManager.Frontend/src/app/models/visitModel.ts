import { userModel } from "./userModel";

export interface visitModel{
    id:string;
    title:string;
    dateCreated:Date;
    courseId:string;
    visitors:userModel[];
}