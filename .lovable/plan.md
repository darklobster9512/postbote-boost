# Hero-Titel in der Smartphone-Ansicht sauber umbrechen

## Ziel

Auf dem Handy steht der gelbe Teil des Titels aktuell auf drei Brocken:

```text
Nur dein
Einkommen wächst.
```

Gewünscht ist:

```text
Nur dein Einkommen
wächst.
```

Also: „Einkommen" bleibt in der Zeile von „Nur dein", nur „wächst." rutscht in die nächste Zeile.

## Was genau passiert

Der Titel steht in `src/components/landing/Hero.tsx`. Für die Umbrüche ist dort nichts vorgegeben – die Seite überlässt das dem Browser, und der wählt auf dem Handy die unschöne Variante (er verteilt die Zeilen „gleichmäßiger", statt „Einkommen" hochzuziehen).

Zusätzlich ist die Schrift auf dem kleinen Bildschirm einen Tick zu groß: „Nur dein Einkommen" passt nur bis ganz herunter zu sehr kleinen Geräten (320 px Breite) nicht in eine Zeile. Deshalb braucht es für ganz kleine Handys eine etwas kleinere Schriftstufe – sonst würde der erzwungene Umbruch dort sogar drei Zeilen erzeugen.

## Umsetzung

1. **Umbruch vorgeben** – hinter „Einkommen" kommt ein Umbruch, der nur auf dem Handy aktiv ist (ab Tablet wieder automatisch). Der Text selbst bleibt wortgleich: „Nur dein Einkommen wächst."
2. **Schriftstufe für sehr kleine Geräte** – unterhalb von 368 px Bildschirmbreite rückt der Titel eine Stufe kleiner (30 px statt 36 px). Ab 368 px bleibt es bei der heutigen Größe, Tablet und große Bildschirme bleiben komplett unverändert.
3. **Sicherheit** – ein Leerzeichen vor „wächst." bleibt auch dann erhalten, wenn auf dem Tablet der Handy-Umbruch aus ist (sonst klebten die Wörter aneinander).

Geprüfte Breiten (gemessen im laufenden Preview):

```text
320 px  ->  30 px Schrift, "Nur dein Einkommen" = 265 px  (Platz 288)  passt
368 px  ->  36 px Schrift, "Nur dein Einkommen" = 321 px  (Platz 336)  passt
375 px  ->  36 px Schrift, "Nur dein Einkommen" = 321 px  (Platz 343)  passt
393 px  ->  36 px Schrift, "Nur dein Einkommen" = 321 px  (Platz 361)  passt
414 px  ->  36 px Schrift, "Nur dein Einkommen" = 321 px  (Platz 382)  passt
```

## Nach dem Ändern prüfen

- Handy-Breiten 320 / 360 / 375 / 393 / 414 px: gelber Titel genau zwei Zeilen – „Nur dein Einkommen" und darunter „wächst.", mittig, nichts abgeschnitten.
- Erste Zeile „Es ändert sich nichts." bleibt auf einer Linie.
- Tablet (768 px) und große Bildschirme (1024 / 1440 px): unverändert, gelber Titel auf einer Zeile.
- Keine Fehlermeldung im Browser, Überschrift-Foto verglichen.
