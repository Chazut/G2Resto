import { Plat } from './Plat.model';

export class Panier {
    public plats: Plat[]
    public owner: string;
    public done: boolean = false;
    constructor(){}
}