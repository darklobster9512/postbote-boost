# Bewerbungs-Sektion über die FAQ-Sektion verschieben

## Was sich ändert
Die Sektion „Jetzt bewerben" (Formular) steht künftig **vor** den „Häufigen Fragen" – direkt nach den Voraussetzungen. Reihenfolge auf der Seite:

```text
vorher:  Voraussetzungen → FAQ → Bewerbung → Fußzeile
nachher: Voraussetzungen → Bewerbung → FAQ → Fußzeile
```

## Umsetzung
- In `src/routes/index.tsx` wird `<ApplicationForm />` eine Zeile nach oben gezogen, also vor `<Faq />` gerendert (aktuell: `Faq`, dann `ApplicationForm`).
- An den Sektionen selbst ändert sich nichts: beide sind unabhängige Abschnitte mit eigenen Anker-Zielen (`#bewerbung`, `#faq`), keine ist optisch als "letzte Sektion" gebaut.
- Die Kopfzeile bleibt unverändert: Der gelbe Button „Jetzt bewerben" führt weiterhin zu `#bewerbung`, der „FAQ"-Link zu `#faq` – beide Anker funktionieren nach dem Tausch wie gehabt.

## Prüfung nach dem Tausch
- Build läuft fehlerfrei durch.
- Klick im Kopf auf „Jetzt bewerben" springt zum Formular, „FAQ" zur Fragen-Liste; das Formular lässt sich wie bisher abschicken und zeigt die Bestätigung.
- Keine abgeschnittenen Texte oder Abstände, die durch die neue Reihenfolge entstehen.
