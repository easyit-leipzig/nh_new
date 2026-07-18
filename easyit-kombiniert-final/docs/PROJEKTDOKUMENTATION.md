# Projektdokumentation

## Architektur
Die Website verwendet semantische HTML5-Landmarken. Der Header enthält Markenlogo, H1, H2 und drei primäre Aktionen. Darunter liegt die horizontale Hauptnavigation. Auf der Startseite ergänzt eine sticky Schnellzugriffsleiste die Navigation, ohne sie zu ersetzen.

## Responsive Verhalten
Unter 1000 px wechselt die Schnellzugriffsleiste in eine horizontale Darstellung. Unter 760 px wird die Hauptnavigation durch einen Menüschalter gesteuert; Inhalte und Karten werden einspaltig.

## Barrierefreiheit
- sichtbare Tastaturfokusse
- semantische Überschriftenstruktur
- Alternativtexte für inhaltliche Bilder
- `aria-label`, `aria-controls`, `aria-expanded` und `aria-current`
- native `details`/`summary`-Elemente für FAQ

## Designsystem
Leipzig-orientierte Farbwelt mit Blau und Gelb, ergänzt durch helle Flächen. Abstände, Schatten, Radien und Maximalbreite sind über CSS-Variablen zentral steuerbar.

## Erweiterung
Neue Seiten können aus einer bestehenden Inhaltsseite abgeleitet werden. Dabei müssen Header, Navigation und Footer unverändert übernommen, Seitentitel und Meta-Beschreibung angepasst und der Hauptinhalt in `<main>` platziert werden.
