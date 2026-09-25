# Einblenden auch für Hero und die ersten Sektionen reparieren

## Ursache (im Test nachgemessen)
- Die Seite braucht in der Vorschau ca. 2–3 s, bis sie „fertig geladen" ist. Erst dann startete die Animation. Bis dahin war der obere Bereich leer, danach erschien der Hero praktisch schlagartig.
- Ein Sicherheits-Timer schaltete nach 4 s die Animationen komplett ab. Alles, was bis dahin sichtbar war (Hero, 2. Sektion), tauchte deshalb ohne Einblenden auf. Erst Sektionen, zu denen man später scrollt, wurden danach wieder… nicht zuverlässig animiert.

## Lösung
- **Hero + Kopfleiste:** Einblenden läuft rein über die Gestaltung, sofort beim ersten Anzeigen – ohne auf das Laden zu warten. Reihenfolge: Kopfleiste, Logo, Zeile 1, Zeile 2, Text, Knöpfe, Kennzeichen, Kennzahlen; je ca. 0,12 s versetzt, weich von unten, leicht unscharf zu scharf, ca. 0,9 s.
- **Alle anderen Sektionen:** Einblenden über eine echte Animation statt eines Übergangs, damit sie garantiert abgespielt wird, sobald die Sektion ins Bild kommt – auch die 2. Sektion, wenn sie beim Aufruf schon sichtbar ist.
- Sicherheits-Timer entfernt das Einblenden nur noch, wenn wirklich gar nichts geladen hat, statt immer nach 4 s.
- „Bewegung reduzieren" bleibt: dann alles sofort sichtbar.

## Technische Details
- Hero.tsx: den Elementen Klassen `hero-anim` mit `style={{"--i": n}}` geben; CSS `@keyframes rv-up` (opacity 0→1, translateY 32px→0, blur 6px→0), `animation: rv-up .9s cubic-bezier(.22,1,.36,1) both; animation-delay: calc(var(--i)*120ms)` unter `html[data-anim]`. Hero nicht mehr in `Reveal`.
- Reveal: `.rv-item` versteckt, `.rv-in .rv-item { animation: rv-up ... ; animation-delay: calc(var(--i)*90ms) }` statt transition.
- __root-Skript: Timer entfernt `data-anim` nur, wenn `data-anim-ready` fehlt; Timer auf 6 s.
- Prüfung per Screenshot-Serie bei 1492 px und 393 px während der ersten 2 s.
