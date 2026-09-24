# Hero-Bubbles: Cash-Icon raus, Blasen rücken näher an den Text

## Was sich ändert

- Das Bargeld-Icon verschwindet komplett. Alle 13 Bubbles zeigen wieder nur **Posthorn** oder **Bitcoin** (7 × Posthorn, 6 × Bitcoin).
- Die Bubbles links und rechts sitzen deutlich dichter am Text: Sie richten sich nicht mehr nach dem Seitenrand des Bildschirms, sondern nach dem eigentlichen Textblock. Der Abstand zur Überschrift beträgt dann nur noch gut eine Daumenbreite statt eines großen leeren Streifens – egal wie breit der Bildschirm ist.
- Das Bargeld-Bild wird aus dem Projekt entfernt, damit keine ungenutzte Datei übrig bleibt.
- Alles andere bleibt unangetastet: schwebende Bewegung, unterschiedliche Transparenz, zweizeilige Überschrift, Kennzahlen, Buttons, Hinweis-Texte („Keine Pakete."), übrige Seitenbereiche.

## So sieht die neue Anordnung aus

```text
        [Post]            [BTC]                [Post]
   [BTC]        Du bringst sowieso Briefe raus.        [Post]
   [Post]       Verdien dir jetzt etwas dazu.          [BTC]
        [BTC]   [Jetzt bewerben] [So funktioniert's]  [BTC]
   [Post]       Steuerfrei · Bar oder Krypto · …       [Post]
        [BTC]   Verdienst   ·   Auszahlung            [BTC]
```

- Acht Blasen stehen direkt links und rechts neben Überschrift, Text und Buttons – je vier pro Seite.
- Fünf weitere setzen oben und unten Akzente, etwas weiter außen, damit die Section nicht symmetrisch wirkt.
- Größen 40–84 px, Transparenz 45–95 %, verschiedene Tempi und Startzeitpunkte – wie bisher.

## Prüfung

- Nachbau im laufenden Preview bei 1593 px (deine aktuelle Größe), 1280 px und 1024 px: jede Blase einzeln vermessen, keine darf die Schrift berühren oder abschneiden.
- Kein Balken am rechten/randlichen Rand, keine Console-Fehler, Bewegung läuft.
- Auf dem Handy bleiben die Bubbles weiterhin ausgeblendet.

## Technische Details

- `src/components/landing/Hero.tsx`:
  - `cash`-Import, `CASH_URL`, `"cash"` aus dem `BubbleIcon`-Typ und aus `ICON_URLS` entfernen.
  - `BUBBLES` neu definiert: statt `left` in Prozent speichert jeder Eintrag eine Seitenangabe (`side: "left" | "right"`) und `offset` (Abstand der Blasenaußenseite von der Bildschirmmitte in px). Rendering: linke Seite `right: calc(50% + Xpx)`, rechte Seite `left: calc(50% + Xpx)`; `top` bleibt prozentual.
  - Sichtbarkeit: enge Blasen (`offset + size ≤ 512`) bleiben `hidden lg:block`, die weiter außen liegenden (Nr. 9–13) werden auf `hidden xl:block` gesetzt, damit sie bei 1024 px nicht angeschnitten werden.
- `src/assets/cash.webp.asset.json`:Asset per `lovable-assets delete --file src/assets/cash.webp.asset.json` löschen (Zeigerdatei und CDN-Objekt), da danach nichts mehr darauf verweist.
- Keine Änderungen an `src/styles.css` (Keyframes `bubble-float` bleibt), an `config.ts` oder an anderen Sektionen.
