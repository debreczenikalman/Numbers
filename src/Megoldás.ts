import { strict } from "assert";
import fs from "fs";
import { resolve } from "path";
import Esemény from "./Események";

export default class Megoldás {
    public kérdések: Array<Esemény>;
    constructor(fájlnév: string) {
        const sorok = fs.readFileSync(fájlnév).toString("utf-8").split("\r\n");
        this.kérdések = new Array<Esemény>();
        for (let i = 0; i < sorok.length - 2; i += 2) {
            this.kérdések.push(new Esemény(sorok[i], sorok[i + 1].split(" ")));
        }
    }

    /**
     * ElsőFeladat
     */
    public ElsőFeladat(): number {
        return this.kérdések.length;
    }
    /**
     * MásodikFeladat
     */
    public MásodikFeladat(): string {
        const pontok = new Array<number>();
        pontok.push(0);
        pontok.push(0);
        pontok.push(0);
        let i;
        for (i = 0; i < this.kérdések.length; i++) {
            const e = this.kérdések[i];
            if (e.téma === "mathematics") {
                pontok[e.pontszám - 1]++;
            }
        }
        return "Összesen " + (pontok[0] + pontok[1] + pontok[2]) + " matematikai kérdés van, pontszámok: 1: " + pontok[0] + " 2: " + pontok[1] + " 3: " + pontok[2];
    }
}
