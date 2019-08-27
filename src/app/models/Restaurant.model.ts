import { Plat } from './Plat.model';

export class Restaurant {
    img: string;
    plats: Plat[];
    constructor(
        public nom: string, 
        public adresse: string, 
        public telephone: string, 
        public foodtype: string,
        public description: string
    ){}
}