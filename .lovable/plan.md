# Werbebild-Prompt Meta – kurze, direkte Ansprache

Zwei Zeilen, die jeder in einer Sekunde kapiert: Frage, dann das Geld. Alles andere im Bild ist nur noch Deko.

## Der Prompt – komplett einfügen

```text
Erstelle ein fertiges Werbebild im Hochformat 4:5, fotorealistisch.

Bild: früh morgens, deutsche Wohnstraße, leichter Dunst, tiefstehende warme Sonne über
nassem Asphalt. Ein Briefträger in dunkler Uniform mit gelbem Schulterpanel und gelber
Ledertasche steckt einen weißen Brief in einen Briefkasten an einer Hauswand. Motiv
rechts, Fokus auf Hand und Brief, Hintergrund weich unscharf, 85mm bei f/1.8.

Farbwelt: sehr dunkler, warmer Kohlegrau-Ton, tiefe Schwärzen, genau ein gesättigter
Akzent in Gelb #FFCC00, ein kleines rotes Detail am Briefkasten. Hoher Kontrast,
feines Filmkorn, oben und links viel ruhige dunkle Fläche für den Text.

Text im Bild, exakt und fehlerfrei, fette serifenlose Schrift im Stil von Roboto:
erste Zeile, weiss: Du bist Postbote?
zweite Zeile, doppelt so gross, Gelb #FFCC00: Verdiene jetzt bis zu 10.000 € im Monat
darunter, klein, weiss: bar oder in Krypto
ganz unten, gefüllter gelber Knopf mit dunkler Schrift: Jetzt bewerben

Schreib ausschliesslich diese Wörter, keinen weiteren Buchstaben.

Nicht im Bild: Pakete, Kartonagen, Transportwagen, Geldscheine, Goldbarren, Logos oder
Schriftzüge von Post oder DHL, real erkennbare Personen, amerikanische Briefkästen,
Stockfoto-Lächeln, verformte Hände, Wasserzeichen.
```

## Einstellungen

```text
Seitenverhältnis: 4:5 (1080x1350) für den Feed, dazu 1:1 (1080x1080) und 9:16 (1080x1920)
Durchläufe: 4 bis 6, dann das beste behalten
```

Wenn das Eurozeichen oder die Punkte in der Zahl falsch herauskommen: im Prompt „10.000 EUR" schreiben und die Zahl nachträglich korrigieren.

## Andere Köpfe im selben Stil (nur die zwei Textzeilen tauschen)

```text
Du bist Postbote?              Verdiene jetzt bis zu 10.000 € im Monat
Noch auf Tour?                 Bis zu 10.000 € im Monat extra, bar oder in Krypto
Briefe bringst du sowieso.     Verdien bis zu 10.000 € im Monat dazu
Nur für Postboten der Deutschen Post.   Bis zu 10.000 € im Monat, steuerfrei
Deine Tour bleibt.             Dein Einkommen wächst – bis zu 10.000 € im Monat
```

## Anzeigentext dazu

```text
Primärtext:
Du bist Postbote und machst deine Tour sowieso? Dann nimm unsere Briefe einfach mit.
Bis zu 10.000 € im Monat extra, bar oder in Krypto, steuerfrei. Kein Jobwechsel,
keine Pakete.

Überschrift:  Bis zu 10.000 € im Monat dazuverdienen
Beschreibung: Nur für angestellte Briefzusteller der Deutschen Post
Knopf:        Jetzt bewerben
```

## Kurz before dem Start

- Recruitings-Anzeigen in der EU laufen unter der Sonderkategorie „Beschäftigung" – beim Anlegen angeben, sonst wird abgelehnt.
- „bis zu" immer mitnehmen, das ist der Unterschied zwischen erlaubt und abgelehnt.
- Das Post-Logo nicht mit generieren lassen; es liegt im Projekt unter `public/images/deutsche-post-logo.svg` und kommt als eigene Ebene ins Bild.
- Nach jedem Durchlauf den Text Buchstabe für Buchstabe lesen.

## Danach

Schick mir die besten drei, dann lege ich sie unter `ads/images/` ab, prüfe die sicheren Zonen für alle Anzeigenformate und schreibe die Textvarianten für die Kampagne.
