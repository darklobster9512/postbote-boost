# Hero-Überschrift tauschen

## Was passiert

Die Überschrift oben auf der Seite bekommt deinen neuen Text. Der Aufbau bleibt exakt so, wie er jetzt ist: zwei Zeilen, beide mittig, die obere weiß, die untere in DHL-Gelb.

Neu:

```text
Es ändert sich nichts.        (weiß)
Nur dein Einkommen wächst.    (gelb)
```

Der Rest der Seite bleibt, wie er ist: das Deutsche-Post-Logo darüber, der Fließtext darunter mit „Kein Jobwechsel. Keine Pakete. Kein zweiter Arbeitgeber im Weg.", dieButtons, die Kennzahlen und alle weiteren Abschnitte.

## Kleine Entscheidung

Dein Text stand ohne Punkt am Ende. Ich setze die Punkte dazu, damit die Überschrift genauso aussieht wie der Rest der Seite (alle anderen Überschriften enden mit Punkt). Wenn du sie lieber nackt willst, sag es – dann bleiben sie weg.

## Technische Details

- Nur ein Block wird angefasst: die beiden Textzeilen der Überschrift in `src/components/landing/Hero.tsx` (Zeilen 26–31).
- Die Formatierungs-Klassen bleiben unverändert – die zweite Zeile behält die Gelb-Farbe, beide Zeilen bleiben eine eigene Linie und bleiben auf großen Bildschirmen in einer Linie.
- Der alte Text („Du bringst sowieso Briefe raus." / „Verdien dir jetzt etwas dazu.") kommt nur an dieser einen Stelle vor. Die Browser-Tab-Texte und die Suchmaschinen-Texte haben eigene Formulierungen und bleiben unberührt.
- Kein Lovable Cloud, keine Datenbank, keine Datenübertragung – es ändert sich nichts an der Funktion des Bewerbungsformulars.

## Prüfung danach

- Build läuft durch ohne Fehlermeldung.
- Blick in die laufende Vorschau auf dem großen Bildschirm, am Laptop und auf dem Handy: zwei Zeilen, mittig, nichts abgeschnitten, nichts läuft seitlich über.
- Überschrift und Buttons bleiben zentriert unter dem Logo; die Bestätigungsmeldung des Formulars funktioniert weiterhin.
