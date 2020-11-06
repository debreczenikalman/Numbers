import { existsSync } from "fs";
import Megoldás from "../Megoldás";

// test("hello world", () => {
//     const str = "Hello, WORLD!";
//     expect(typeof str).toBe("string");
//     expect(str.toLocaleLowerCase()).toBe("hello, world!");
//     expect(str.split(" ")[0]).toBe("Hello,");
//     expect(str.split(" ")[1]).toBe("WORLD!");
// });
const feladat: Megoldás = new Megoldás("numberquest.txt");
test("Helyes beolvasás", () => {
    expect(feladat.kérdések.length).toBe(feladat.ElsőFeladat());
});
test("Helyes minimum és maximum", () => {
    expect(feladat.kérdésekMin).toBeLessThan(feladat.kérdésekMax);
    let min = Number.MAX_VALUE;
    for (let i = 0; i < feladat.kérdések.length; i++) {
        const e = feladat.kérdések[i];
        if (e.megoldSzám < min) {
            min = e.megoldSzám;
        }
    }
    expect(feladat.kérdésekMin).toBe(min);
    let max = Number.MIN_VALUE;
    for (let i = 0; i < feladat.kérdések.length; i++) {
        const e = feladat.kérdések[i];
        if (e.megoldSzám > max) {
            max = e.megoldSzám;
        }
    }

    expect(feladat.kérdésekMax).toBe(max);
});
test("Témák listázása", () => {
    expect(feladat.ÖtödikFeladat().length).toBe(5);
    let ismétlődik = false;
    for (let i = 0; i < feladat.ÖtödikFeladat().length; i++) {
        const e = feladat.ÖtödikFeladat()[i];
        for (let j = i + 1; j < feladat.ÖtödikFeladat().length; j++) {
            const ee = feladat.ÖtödikFeladat()[j];
            if (e == ee) {
                ismétlődik = true;
            }
        }
    }
    expect(ismétlődik).toBe(false);
});
test("Megfelelő pontozás", () => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < feladat.kérdések.length; i++) {
        const e = feladat.kérdések[i].pontszám;
        if (min > e) {
            min = e;
        } else if (max < e) {
            max = e;
        }
    }
    expect(min).toBe(1);
    expect(max).toBe(3);
});
test("Létező kimenet", () => {
    feladat.HetedikFeladat();
    expect(existsSync("testquests.txt")).toBe(true);
});
