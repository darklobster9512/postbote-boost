# Deutsche-Post-Logo statt der „Nur für Postboten"-Pille

Der oberste Bereich bekommt anstelle der gelben Pille mit dem Satz das echte Deutsche-Post-Logo: gelber Block mit dunkler Wortmarke und Posthorn, originalgetreu (Ecken eckig, Gelb #fcc310), mittig über der zweizeiligen Überschrift. Der Satz „Nur für Postboten der Deutschen Post" entfällt an dieser Stelle.

## Was passiert

1. **Logo-Datei ins Projekt holen** – das hochgeladene SVG wird als `src/assets/deutsche-post-logo.svg` übernommen. Die Farben bleiben exakt wie im Upload (`#fcc310` Gelb, `#231f20` Wortmarke). Einzige Veränderung: die Datei bekommt eine `viewBox` und verliert ihre feste Größe.
   - Warum das nötig ist: ohne diese Zeile zeigt die Seite nur einen stark vergrößerten, abgeschnittenen Teil des Schriftzugs statt des ganzen Logos. Das wurde im Browser nachgeprüft – mit `viewBox` ist das Logo komplett und scharf sichtbar, ohne nur ein Fragment.
2. **Pille ersetzen** – im oberen Bereich wird der gelbe runde Hinweis durch das Logo als Bild ersetzt: zentriert, oben im Block, ohne Rand und ohne Hintergrund-Kästchen, damit der gelbe Block des Logos selbst die Fläche füllt. Breite etwa 200 px auf dem Handy, rund 260 px am großen Bildschirm; der Abstand zur Überschrift bleibt wie gewohnt.
3. **Rest bleibt unangetastet** – zweizeilige Überschrift (weiß / gelb), Einleitungstext inklusive „Keine Pakete.", die Buttons, die drei Hinweise „Steuerfrei / Bar oder Krypto / Ohne Post-Abrechnung", die beiden Kennzahlen, der Auszahlungs-Hinweis und das Streifen-Band darunter. Auch die Klarstellung in den häufigen Fragen, dass diese Seite unabhängig und keine offizielle Seite der Deutschen Post oder DHL ist, bleibt stehen – gerade mit echtem Logo ist sie wichtig.
4. **Nachprüfen** – im laufenden Preview: Logo wird wirklich geladen (kein Lade-Fehler), ist vollständig sichtbar und nicht abgeschnitten, mittig ausgerichtet, auf dem Handy genauso; Überschrift und Buttons unverändert; keine Fehlermeldung im Browser.

## Fachliche Details

- Datei: `src/assets/deutsche-post-logo.svg` (Kopie aus dem Upload, `viewBox="0 0 984 218"` ergänzt, feste `width`/`height` entfernt). Bewusst im Repo und nicht als CDN-Asset, weil die Datei bearbeitet werden musste.
- Einbindung: `import dpLogo from "@/assets/deutsche-post-logo.svg";` und `<img src={dpLogo} alt="Deutsche Post" />` im Container des oberen Bereichs; `width:100%; height:auto` über eine feste Maximalbreite, damit das Seitenverhältnis 984:218 erhalten bleibt.
- Das `<img>` steht an der Stelle des bisherigen `<p>`-Elements (aktuell Hero.tsx, Zeilen 17–20); der folgende `mt-6` der Überschrift wird auf `mt-8` gesetzt, damit der Abstand optisch gleich bleibt.
- Keine Farben, Abstände oder Schriftarten der Seite werden geändert; nur diese eine Stelle.
