import { IJre } from '../util/ijre';

export class Jremodel implements IJre {
    id: number;
    jrename: string;
    basepackage: string;
    location:string;
    constructor(id,jrename,basepackage,location){
        this.id=  id;
        this.jrename = jrename;
        this.basepackage = basepackage;
        this.location = location;
    }
}
