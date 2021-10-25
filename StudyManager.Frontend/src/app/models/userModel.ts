import { courseModel } from "./courseModel";
import { Role } from "./Role";

export interface userModel{
    id:string;
    login:string;
    name:string;
    surename:string;
    role:Role;
    dateCreated:Date;
    avatar:string;
    courses:courseModel[];
    createdCourses:courseModel[];
}