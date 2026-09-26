# Bild-Prompt für Higgsfield – Meta-Anzeigen im Post-Stil

Ein master-Prompt zum Hineinkopieren, plus austauschbare Motiv-Blöcke. Gebaut auf die echte Seite: sehr dunkler, warmer Hintergrund, Gelb #FFCC00 als einziger Saturations-Akzent, Rot nur als Detail, harte Roboto-Überschrift, Briefe statt Pakete.

## Was du in Higgsfield einstellst

```text
Modell:     fotorealistisch (Text-fähig, falls du die Überschrift im Bild willst)
Seitenverhältnis: 4:5  (1080x1350)  <- Hauptbild für Feed
weitere:    1:1 (1080x1080), 1.91:1 (1200x628), 9:16 (1080x1920)
Anzahl:     4-6 Durchläufe pro Motiv, dann das beste behalten
```

## Haupt-Prompt (Englisch, funktioniert bei den meisten Modellen am besten)

```text
Photorealistic cinematic photograph, early morning, quiet residential street in a German
suburb. A letter carrier in a dark charcoal uniform with a bright yellow shoulder panel
and a yellow leather satchel pushes a white letter through the slot of a wall-mounted
letterbox. Mist in the air, low warm sunlight raking across wet asphalt, shallow depth of
field, 85mm lens at f/1.8, focus on the hand and the letter, background softly blurred.

Mood and grade: dark, moody, warm charcoal-grey tones, deep blacks, one saturated accent
only, vivid yellow #FFCC00, one small red detail on the letterbox. High contrast, subtle
film grain, no haze filters, no HDR look.

Composition: subject on the right third, large clean dark negative space on the left and
top for a headline. Vertical 4:5 frame.

Strictly exclude: any logos, wordmarks, brand names or corporate lettering, any readable
text anywhere, parcels, cardboard boxes, packages, hand trucks, delivery vans, money
stacks, gold bars, smiling stock-photo poses, real identifiable people, uniforms of any
real postal company, American or British postboxes, extra fingers, warped hands.
```

## Deutsche Fassung (falls du lieber auf Deutsch arbeitest)

```text
Fotorealistisches Kino-Foto, früh morgens, ruhige Wohnstraße in einer deutschen
Vorstadt. Eine Briefträgerin in dunkler Kohlegrau-Uniform mit gelbem Schulterpanel und
gelber Ledertasche schiebt einen weißen Brief in einen Briefkasten an einer Backsteinwand.
Leichter Dunst, tiefe warme Sonne über nassem Asphalt, geringe Schärfentiefe, 85mm bei
f/1.8, Fokus auf Hand und Brief.

Stimmung: dunkel, warm-graue Töne, tiefe Schwärzen, nur ein gesättigter Akzent in Gelb
#FFCC00, ein kleines rotes Detail am Briefkasten. Hoher Kontrast, feines Filmkorn.

Komposition: Motiv rechts Drittel, große ruhige dunkle Fläche links und oben für eine
Überschrift. Hochformat 4:5.

Ausgeschlossen: Logos, Schriftzüge, Markennamen, jeglicher lesbare Text, Pakete,
Kartonagen, Transportwagen, Zustellfahrzeuge, Geldscheine, Goldbarren,
Stockfoto-Lächeln, real erkennbare Personen, Uniformen echter Postunternehmen.
```

## Motiv-Blöcke zum Austauschen (der Rest des Prompts bleibt gleich)

**A – Briefkasten-Nahaufnahme (Standard, oben):** Hand mit weißem Brief über gelbem Schlitz, Briefkasten im Dunkeln, ein Regentropfen auf dem Metall.

**B – Rückenansicht Tour (gut für 1.91:1):** dieselbe Person geht mit gelber Tasche einen nebligen Bürgersteig entlang, warme Laternen, viele Briefe statt Paketen sichtbar, viel freier Raum links.

**C – Sortieren am Tisch (quadratisch):** Draufsicht auf einen dunklen Holztisch, weiße Briefe werden sortiert, gelber Umschlag als Akzent, eine Tasse Kaffee, scharfes Seitenlicht.

**D – Unterwegs (9:16 für Stories/Reels):** Person auf dem Fahrrad mit gelber Tasche, Hintergrund mit leichter Bewegungunschärfe, Morgenlicht, Straße in Deutschland.

## Wenn das Modell Text sauber kann: Variante mit Überschrift

Nur nutzen, wenn du mit dem Wortlaut einverstanden bist – das Modell schreibt Text fast nie fehlerfrei, also nach dem Generieren prüfen.

```text
Add a clean headline in the dark negative space, bold geometric sans-serif similar to
Roboto, all uppercase-free, crisp white and yellow:
line 1 in white: Es ändert sich nichts.
line 2 in yellow #FFCC00: Nur dein Einkommen wächst.
No other text, no numbers, no logos, no buttons.
```

Ohne diesen Block bleibt das Bild komplett textfrei – die Überschrift setzt du dann in Meta selbst darüber, was sauberer und erlaubnisicherer ist.

## Nie im Bild (gilt für jeden Durchlauf)

- Keine Pakete, Kartonagen oderTransportwagen – die Seite sucht ausschließlich Briefzusteller.
- Keine Logos oder Schriftzüge von Post oder DHL, nicht generieren lassen. Das echte Logo liegt im Projekt unter `public/images/deutsche-post-logo.svg` und kommt später als eigene Ebene ins Bild.
- Kein Geld, keine Goldbarren, keine Euro-Scheine – wirkt wie ein unseriöses Versprechen und erhöht die Ablehnungsgefahr.
- Keine echten, erkennbaren Personen.

## Vor dem ersten Meta-Start

- Recruitings-Anzeigen gehören in der EU zur Sonderkategorie „Beschäftigung“. Beim Anlegen angeben, sonst wird die Anzeige abgelehnt; die Zielgruppe ist dort stärker eingeschränkt.
- Verdienst- und Steuerangaben besser in den Anzeigentext als ins Bild, ohne Garantie-Wording. Der Hinweis „bis zu“ gehört dazu.
- Ein Logo auf dem Bild kann die Prüfung auf Markenverwechslung auslösen. Empfehlung: erst ohne Logo testen, Logo-Variante als zweite Anzeige.

## Danach

Schick mir das ausgewählte Bild (oder alle Kandidaten), dann lege ich es unter `ads/images/` als Kampagnenmaterial ab, prüfe diesafe Zonen für die vier Anzeigenformate und schreibe dazu die Anzeigentexte.
