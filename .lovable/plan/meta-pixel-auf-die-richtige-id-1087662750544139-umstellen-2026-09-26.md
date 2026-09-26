# Meta-Pixel auf die richtige ID 1087662750544139 umstellen

## Ursache
Eingebaut ist die Pixel-ID **3066494063553815**. Genau diese ID stand in dem Code, den du mir geschickt hast. Deine Leads landen deshalb bei diesem Pixel und nicht bei **1087662750544139**. Das Lead-Event selbst wird ausgelöst, das hat der Test bestätigt.

## Änderungen
1. `src/routes/__root.tsx`: `META_PIXEL_ID` auf `1087662750544139` ändern. Diese Konstante nutzen sowohl das Skript (`fbq('init', ...)` mit PageView) als auch das Ersatzbild (`<noscript>`) für Besucher ohne JavaScript.
2. `ApplicationForm.tsx` bleibt, wie es ist. Das Lead-Event geht nach erfolgreichem Absenden automatisch an den neuen Pixel.
3. Suche im ganzen Projekt: Die alte ID darf nirgends mehr vorkommen, und es darf keinen zweiten Pixel geben.

## Prüfung
- Mit Playwright die Seite laden und kontrollieren, dass der Pixel mit der ID 1087662750544139 startet.
- Eine Bewerbung absenden und bestätigen, dass `Lead` ausgelöst wird.
- Hinweis an dich: Die Änderung wirkt erst, wenn deine Domain die neue Version ausliefert. Danach kannst du sie im Events Manager unter „Test Events“ live prüfen.
