# Hero ohne Bild – alles mittig zentriert

Der Hero wird von zwei Spalten auf eine mittige Spalte umgestellt. Das Foto entfällt komplett, alle Inhalte (Badge, Überschrift, Text, Buttons, Pills, Kennzahlen) stehen zentriert untereinander.

## Was sich ändert

- Kein Bild mehr im Hero – die rechte Bildhälfte verschwindet, die Spaltenaufteilung löst sich auf.
- Der komplette Inhalt sitzt mittig auf der Seite, Texte sind zentriert.
- Die drei Kennzahlen (Verdienst / Auszahlung / Pakete) bleiben erhalten, als schmale zentrierte Reihe.
- Die gelben Schräg-Streifen oben im Hintergrund und der gelbe Trennstreifen unten bleiben unverändert.
- An den anderen Abschnitten (Ablauf, Vergütung, Auszahlung, Voraussetzungen, FAQ, Formular, Fußzeile) ändert sich nichts.

## Layout-Skizze

```text
+--------------------------------------------------+
|              [ Nur für Postboten ... ]           |
|                                                  |
|        Du bringst sowieso Briefe raus.           |
|        Verdiens dir jetzt etwas dazu.            |
|                                                  |
|   Text über Zusatzauslieferung auf deiner Tour   |
|                                                  |
|      [ Jetzt bewerben ]  [ So funktioniert's ]    |
|      ( Steuerfrei ) ( Bar oder Krypto ) ( ...)   |
|                                                  |
|   Verdienst    |    Auszahlung    |   Pakete     |
|   bis zu       |    Bar & Krypto  |    Nie       |
|   10.000 €                                       |
|   Auszahlung bar oder in Krypto – steuerfrei ... |
+--------------------------------------------------+
```

## Technische Details

- `src/components/landing/Hero.tsx`: Bild-Import (`heroImage`) und der Bild-Block (einschließlich rotierter Gelb-Kulisse) werden entfernt. Der Container wechselt von `grid ... lg:grid-cols-[1.1fr_0.9fr]` auf eine einspaltige, zentrierte Anordnung (`mx-auto max-w-4xl flex flex-col items-center text-center`, mehr vertikale Luft oben).
- Absätze, Buttons und Pills bekommen `mx-auto` bzw. `justify-center`; die Kennzahlen-Reihe bleibt ein 3-Spalten-Raster mit `mx-auto` und zentrierten Werten.
- Die ungenutzte Datei `src/assets/hero-postbote.jpg` wird gelöscht, damit nichts Totes im Projekt liegt.
- Die Seiten-Metadaten (Titel, Beschreibung, og-Angaben) bleiben wie sie sind – es ist kein Bild hinterlegt.
- Kontrolle: Build-Log prüfen und die Seite im Browser aufrufen (Screenshot), um zu bestätigen, dass nichts abgeschnitten oder verschoben aussieht.
