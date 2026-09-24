# Cash-Icon in Hero-Bubbles + näher am Content + unterschiedliche Opacity

## Ziel
Das hochgeladene Bargeld-Icon (Geldscheine + Münzen, 3D) wird als drittes Icon in die schwebenden Bubbles der Hero-Section aufgenommen. Ein paar der bestehenden Posthorn-/Bitcoin-Bubbles werden damit ersetzt. Auf dem Desktop rücken alle Bubbles näher an den zentrierten Content heran, und die Bubbles bekommen unterschiedliche Transparenz, damit die Verteilung lebendiger und tiefer wirkt.

## Änderungen (nur `src/components/landing/Hero.tsx` + ein neuer Asset-Pointer)

1. **Cash-Icon als Asset**: Das Upload wird per `lovable-assets create` aus `/mnt/user-uploads/` als Pointer `src/assets/cash.webp.asset.json` eingebunden (keine Binärdatei im Repo). Import wie bei Bitcoin/Posthorn, neuer Icon-Typ `"cash"` in `BubbleIcon` und `ICON_URLS`.

2. **Ein paar Bubbles ersetzen**: 3–4 der 13 Bubbles (abwechselnd auf linker/rechter Seite und unten) wechseln auf das Cash-Icon, sodass alle drei Icons gemischt um den Content schweben.

3. **Näher am Content (Desktop)**: Die Außenpositionen werden nach innen gezogen — linke Spalte von ~2–10 % auf ~7–14 % `left`, rechte von ~89–95 % auf ~84–91 %, oberere/untere entsprechend etwas Richtung Mitte. Auf Mobil (sm) bleibt die aktuelle, weiter außen stehende Verteilung erhalten bzw. wird weiterhin über `minScreen` ausgeblendet, damit nichts über den Text fällt.

4. **Unterschiedliche Opacity**: Neues Feld `opacity` pro Bubble (Werte gestreut ca. 0.45–0.95, abwechselnd hoch/niedrig), gesetzt am äußeren Wrapper via `style={{ opacity }}`. Kombiniert mit den bestehenden Größen-/Dauer-Unterschieden entsteht Tiefenwirkung.

## Verifikation
- Build-Fehler-Log prüfen (muss grün sein).
- Playwright: Desktop 1280 px — Cash-Bubbles sichtbar, Bubbles näher am Text, kein Text verdeckt, kein horizontaler Overflow; Mobile 375 px — keine Überlappung mit dem Content, kein Overflow.

## Umfang
Keine Text-, Farb- oder Funktionsänderungen. Die bestehenden Regeln (zweizeilige H1, „Keine Pakete“-Stellen, Roboto, #FFCC00) bleiben unberührt.
