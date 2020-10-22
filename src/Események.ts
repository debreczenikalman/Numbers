export default class Esemény {
    private _esemény: string;
    public get esemény(): string {
        return this._esemény;
    }
    public set esemény(v: string) {
        this._esemény = v;
    }

    private _pontszám: number;
    public get pontszám(): number {
        return this._pontszám;
    }
    public set pontszám(v: number) {
        this._pontszám = v;
    }

    private _évszám: number;
    public get évszám(): number {
        return this._évszám;
    }
    public set évszám(v: number) {
        this._évszám = v;
    }

    private _kérdés: string;
    public get kérdés(): string {
        return this._kérdés;
    }
    public set kérdés(v: string) {
        this._kérdés = v;
    }

    constructor(sor: string[]) {
        this._kérdés = sor[0];
        this._esemény = sor[1];
        this._pontszám = parseInt(sor[2]);
        this._évszám = parseInt(sor[3]);
    }
}
