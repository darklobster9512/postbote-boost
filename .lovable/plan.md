# Einblenden ab der 2. Sektion reparieren + beim Neuladen immer oben starten

## Ziel
- Hero und Kopfleiste bleiben exakt wie jetzt.
- Beim Neuladen startet die Seite immer ganz oben beim Hero, auch wenn man vorher weiter unten war.
- Jede weitere Sektion blendet genau einmal sanft ein, sobald sie beim Herunterscrollen ins Bild kommt. Kein Springen, kein Hochscrollen, keine leeren Flächen.
- Klick auf „Jetzt bewerben“ / „So funktioniert’s“: Das Ziel und alles, woran man vorbeispringt, ist sofort sichtbar.

## Umsetzung
- Kleines Skript im Seitenkopf: Das Browser-Merken der Scrollposition abschalten und beim Laden nach ganz oben springen (ohne sanftes Scrollen, damit nichts sichtbar „hochfährt“). Ein Anker in der Adresse (z. B. #bewerbung) wird dabei entfernt.
- Einblend-Baustein vereinfachen: Sektionen, die beim Start schon im Bild oder darüber liegen, sofort zeigen; alle anderen erst beim Hineinscrollen. Keine Wartezeit auf das vollständige Laden.
- Nur Deckkraft animieren (ca. 0,6 s), keine Verschiebung.
- Bei Sprüngen über die Knöpfe werden übersprungene Sektionen sofort sichtbar.
- Sicherheitsnetz: Falls die Beobachtung nicht funktioniert, ist alles sichtbar.

## Prüfung
- Handy (393 px) und Computer: weit runterscrollen, neu laden – Seite steht oben, Hero-Ablauf läuft.
- Langsam bis zum Fußbereich scrollen: jede Sektion blendet einmal ein, Positionen vorher/nachher gleich.
- Knöpfe „Jetzt bewerben“ und „So funktioniert’s“ testen.
