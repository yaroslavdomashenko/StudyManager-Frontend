import { userModel } from "./userModel";

export interface messageModel{
    id:string;
    user:userModel;
    text:string;
    dateCreated:Date;
}