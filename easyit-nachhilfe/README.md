# easyIT-Nachhilfe Leipzig – Webseitenpaket

## Enthaltene Seiten
- `index.php` – Startseite mit dem neuen Abschnitt „Warum gerade easyIT?“
- `prinzipien.php` – ausführliche Seite mit zwölf begründeten Nachhilfeprinzipien
- `impressum.php` – auszufüllende Vorlage
- `datenschutz.php` – auszufüllende Vorlage
- `includes/` – gemeinsame Kopf- und Fußbereiche
- `assets/css/style.css` – vollständig responsives Leipzig-Blau/Gelb-Neon-Design
- `assets/js/main.js` – Mobilmenü, Jahreszahl und dezente Scroll-Animationen

## Installation
1. ZIP-Datei entpacken.
2. Alle Dateien in das Webverzeichnis des PHP-/LAMP-Servers kopieren.
3. `index.php` im Browser aufrufen.
4. Angaben in `impressum.php` und `datenschutz.php` ergänzen.
5. In `index.php` die Kontaktadresse und bei Bedarf die Formularverarbeitung anpassen.

## Technische Voraussetzungen
- PHP 7.4 oder neuer
- Apache oder Nginx
- kein Framework und keine externe Bibliothek erforderlich

## Hinweis zum Kontaktformular
Das Formular verwendet derzeit `mailto:` und öffnet das E-Mail-Programm des Besuchers. Für einen automatischen Versand über den Server sollte später ein separates PHP-Mail-Skript mit Spam-Schutz ergänzt werden.
