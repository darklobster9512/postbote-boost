# Neuer Hero-Titel: Geld im Vordergrund

## Was sich ändert

Die Überschrift ganz oben tauscht den Satz. Neu, in deiner gewünschten Richtung „Geld im Vordergrund" und weiterhin mit „du":

```text
Zeile 1 (weiß):   Deine Tour bleibt.
Zeile 2 (gelb):   Dein Einkommen wächst.
```

Der Verdienst (bis zu 10.000 € jeden Monat) steht bewusst **nicht** in der Überschrift – er steht schon direkt darunter im Text und in der Kennzahlen-Kachel. So wirkt die Überschrift ruhig und die Zahl stark, statt sich doppelt zu wiederholen.

Alles andere bleibt genau so, wie es ist: Deutsche-Post-Logo mit abgerundeten Ecken, die zwei Buttons, die drei runden Hinweise (Steuerfrei / Bar oder Krypto / Ohne Post-Abrechnung), die zwei Kennzahlen-Kacheln, der Hinweissatz zur Auszahlung und die diagonalen Gelb-Streifen. Auch die Klarstellung „Keine Pakete." im Text darüber bleibt stehen.

## Andere Nummer gefällig?

Wenn du dich für eine andere Nummer aus der Liste entscheidest, tausche ich einfach diese zwei Zeilen aus – am nächsten an deiner Wahl sind:

- Nr. 5: Einmal rausfahren. / Zweimal verdienen.
- Nr. 8: Briefe rausbringen. / Bar oder in Krypto verdienen.
- Nr. 9: Der Weg ist schon da. / Das Extra kommt obendrauf.

## Technische Details

- Datei: `src/components/landing/Hero.tsx`, nur der `<h1>`-Block (die zwei `block`-Spans; der zweite behält `text-primary` für das Gelb).
- Geprüft: der alte Titeltext kommt ausschließlich in dieser Datei vor – die Browser-Tab-Adresse und die Beschreibungs-Texte der Seite haben eine eigene Formulierung und bleiben unverändert.
- Beide Zeilen bleiben kurz genug, damit sie auf dem großen Bildschirm je eine Linie bilden (`lg:whitespace-nowrap` bleibt).
- Nach dem Tausch Sichtprüfung im laufenden Preview bei 1440 / 1280 / 1024 / 375 px: zwei Zeilen, mittig, nichts abgeschnitten, kein seitliches Überlaufen, keine Fehlermeldung im Browser.
