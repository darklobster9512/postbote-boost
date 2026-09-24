# Regel: Pakete-Hinweise bleiben für immer auf der Seite

## Ziel

Die Klarstellung „keine Pakete" ist Kern der Botschaft: wir suchen ausschließlich Briefzusteller,
niemals Paketzusteller. Diese Hinweise dürfen bei keiner zukünftigen Änderung verschwinden –
weder beim Umbauen einer Sektion noch beim Kürzen von Texten.

## Was als Regel festgehalten wird

Eine dauerhafte Projekt-Regel (Merkzettel/Projektgedächtnis, Typ „Verbot"):
**„Pakete-Hinweise nie entfernen – die Seite sucht nur Briefzusteller, keine Paketzusteller."**
Die Regel greift bei jeder Änderung an Text, Layout oder Metadaten.

## Die Hinweise, die erhalten bleiben müssen

Aktuell sind sie an sechs Stellen verankert (alle bleiben unverändert bestehen):

```text
1. Hero, Textzeile          "Kein Jobwechsel. Keine Pakete. Kein zweiter Arbeitgeber im Weg."
2. Hero, Kennzahl-Kachel    "Pakete: Nie"
3. Voraussetzungen, Warnbox "Keine Paketzusteller, keine externen Kuriere"
4. FAQ                      "Muss ich Pakete mit ausliefern?" -> "Nein, nie. ..."
5. Bewerbungsformular       "Paketzusteller und Externe können leider nicht berücksichtigt werden."
6. Seitentexte für Suche /  "keine Pakete" und "kein Paketdienst" in den Beschreibungstexten
   Vorschaubilder
```

## Vorgehen

1. Regel im Projektgedächtnis ablegen (Kern-Regel plus Details mit allen sechs Stellen), damit
   sie auch in neuen Sitzungen automatisch gilt.
2. Bestand prüfen: alle sechs Stellen sind vorhanden und sichtbar – es wird nichts ergänzt,
   gestrichen oder umformuliert.
3. Künftig gilt bei jeder Änderung: nach dem Edit wird geprüft, dass die Pakete-Hinweise weiterhin
   im Seitentext stecken; fehlt einer, wird er an der passenden Stelle wieder ergänzt.

## Technische Details

- Keine neuen Dateien, keine neuen Abhängigkeiten, keine inhaltlichen Änderungen an der Seite.
- Prüfmechanismus bei künftigen Umbauten: Stichwort-Suche nach „Paket" in `src/` muss die
  bekannten Treffer in `Hero.tsx`, `Requirements.tsx`, `Faq.tsx`, `ApplicationForm.tsx`,
  `index.tsx` und `__root.tsx` liefern.
- Der rot markierte Warnkasten in den Voraussetzungen behält zusätzlich den Wortlaut
  „Wichtig: Wir werben nicht ab – und wir suchen nur Briefzusteller."
