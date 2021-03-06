import fs from "fs";
import Esemény from "./Események";

export default class Megoldás {
    public kérdések: Array<Esemény>;

    public get kérdésekMin(): number {
        let min = Number.MAX_VALUE;
        for (let i = 0; i < this.kérdések.length; i++) {
            const e = this.kérdések[i];
            if (e.megoldSzám < min) {
                min = e.megoldSzám;
            }
        }
        return min;
    }
    public get kérdésekMax(): number {
        let min = Number.MIN_VALUE;
        for (let i = 0; i < this.kérdések.length; i++) {
            const e = this.kérdések[i];
            if (e.megoldSzám > min) {
                min = e.megoldSzám;
            }
        }
        return min;
    }

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
    /**
     * ÖtödikFeladat
     */
    public ÖtödikFeladat(): string[] {
        const ret: string[] = new Array<string>();
        ret.push(this.kérdések[0].téma);
        for (let i = 0; i < this.kérdések.length; i++) {
            const e = this.kérdések[i];
            let found: boolean = false;
            for (let j = 0; j < ret.length; j++) {
                const ee = ret[j];
                if (e.téma === ee) {
                    found = true;
                }
            }
            if (!found) {
                ret.push(e.téma);
            }
        }
        return ret;
    }
    HatodikFeladat(téma: string): Esemény {
        const indexex = new Array<number>();
        for (let i = 0; i < this.kérdések.length; i++) {
            const e = this.kérdések[i];
            if (e.téma === téma) {
                indexex.push(i);
            }
        }
        const test1 = Math.round(Math.random() * indexex.length);
        const test = indexex[test1];
        return this.kérdések[test];
    }
    /**
     * HetedikFeladat
     */
    public HetedikFeladat(): void {
        const indexek = new Array<number>();
        for (let i = 0; i < 10; i++) {
            indexek.push(Math.round(Math.random() * this.kérdések.length));
            let contains = false;
            do {
                for (let j = 0; j < indexek.length - 1; j++) {
                    const e = indexek[j];
                    if (e == indexek[indexek.length - 1]) {
                        contains = true;
                        break;
                    }
                    contains = false;
                }
                if (contains) {
                    indexek[indexek.length - 1] = Math.round(Math.random() * this.kérdések.length);
                }
            } while (contains);
        }
        let sum = 0;
        let totaal = "";
        for (let i = 0; i < indexek.length; i++) {
            const e = this.kérdések[indexek[i]];
            totaal += "...\r\n";
            totaal += e.pontszám.toString() + " " + e.megoldSzám.toString() + " " + e.kérdés.toString() + "\r\n";

            sum += e.pontszám;
        }
        totaal += "...\r\n";
        totaal += "Összesen " + sum.toString() + " pontot lehetet elérni a teszten" + "\r\n";
        fs.writeFileSync("testquests.txt", totaal);
    }
}
