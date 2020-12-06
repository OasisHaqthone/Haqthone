import { from } from 'rxjs';
import { Jrepackages } from "../model/jrepackages";
export class Jrepackageresponse {
    jrePackage: Jrepackages[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}
