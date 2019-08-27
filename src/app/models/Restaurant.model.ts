import { Plat } from './Plat.model';

export class Restaurant {
    img: string;
    plats: Plat[];
    hasPlat: boolean = false;
    constructor(
        public nom: string, 
        public adresse: string, 
        public telephone: string, 
        public foodtype: string,
        public description: string
    ){}
}