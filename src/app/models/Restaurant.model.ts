export class Restaurant {
    img: string;
    constructor(
        public nom: string, 
        public adresse: string, 
        public telephone: string, 
        public foodtype: string,
        public description: string
    ){}
}