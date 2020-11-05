import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        res.write("Informatika angol nyelven — emelt szint<br>");

        const feladat: Megoldás = new Megoldás("numberquest.txt");

        res.write("Második feladat: A fájlban " + feladat.ElsőFeladat().toString() + " kérdés van<br>");
        res.write("Harmadik feladat: " + feladat.MásodikFeladat() + "<br>");
        res.write("Negyedik feladat: A megoldások között a legkisebb szám a " + feladat.kérdésekMin.toString() + " és a legnagyobb a " + feladat.kérdésekMax.toString() + "<br>");
        res.write("Ötödik feladat: A témák a következőek:<br>");
        for (let i = 0; i < feladat.ÖtödikFeladat().length; i++) {
            const e = feladat.ÖtödikFeladat()[i];
            res.write(e + "<br>");
        }

        let téma = params.tema as string;
        if (téma == undefined) {
            téma = "Kérem a témát";
        }
        res.write(`Kérek egy témát: <input type='text' name='tema' value='${téma}' style='max-width:150px;' onChange='this.form.submit();'>\n`);

        if (téma != undefined && téma != "Kérem a témát") {
            const t = feladat.HatodikFeladat(téma);
            res.write(t.kérdés + "<br>");
            const tipp = parseInt(params.tipp as string);
            res.write(`Kérek egy tippet: <input type='number' name='tipp' value='${tipp}' style='max-width:150px;' onChange='this.form.submit();'> A helyes válasz ${t.pontszám} pontot ér<br>`);
            if (!isNaN(tipp)) {
                if (tipp === t.megoldSzám) {
                    res.write("Helyes válasz");
                } else {
                    res.write("Helyetlen válasz. A jó megoldás " + t.megoldSzám);
                }
            }
        }
        // <---- Fejezd be a kódolást
        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
