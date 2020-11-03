export default class Esemény {
    private _téma: string;
    public get téma(): string {
        return this._téma;
    }
    public set téma(v: string) {
        this._téma = v;
    }

    private _pontszám: number;
    public get pontszám(): number {
        return this._pontszám;
    }
    public set pontszám(v: number) {
        this._pontszám = v;
    }

    private _megoldSzám: number;
    public get megoldSzám(): number {
        return this._megoldSzám;
    }
    public set megoldSzám(v: number) {
        this._megoldSzám = v;
    }

    private _kérdés: string;
    public get kérdés(): string {
        return this._kérdés;
    }
    public set kérdés(v: string) {
        this._kérdés = v;
    }

    constructor(kérdés: string, részletek: string[]) {
        this._kérdés = kérdés;
        this._téma = részletek[2];
        this._pontszám = parseInt(részletek[1]);
        this._megoldSzám = parseInt(részletek[0]);
    }
}
