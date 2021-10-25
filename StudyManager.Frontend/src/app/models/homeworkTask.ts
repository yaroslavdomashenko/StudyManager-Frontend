import { attach } from "./attach";
import { homeworkModel } from "./homeworkModel";

export interface homeworkTask{
    homework:homeworkModel;
    attach:attach[];
}