import fs from "fs";
import Esemény from "./Események";

export default class Megoldás {
    constructor(fájlnév: string) {
        const sorok = fs.readFileSync(fájlnév).toString().split("\r\n");
        this.kérdések = new Array<Esemény>();
        for (let i = 0; i < sorok.length; i + 2) {
            this.kérdések.push(new Esemény((sorok[i] + " " + sorok[i + 1]).split(" ")));
        }
    }
    kérdések: Array<Esemény>;

    /**
     * ElsőFeladat
     */
    public ElsőFeladat(): number {
        return this.kérdések.length;
    }
}
