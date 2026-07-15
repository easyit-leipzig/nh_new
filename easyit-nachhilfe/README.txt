easyIT Leipzig-Blau Premium

Änderungen gegenüber der dunklen Neon-Version:
- Seitenhintergrund vollständig in Leipziger Blau
- keine schwarze Hauptfläche mehr
- helle weiße Inhaltskarten für hohe Lesbarkeit
- dunkles Leipziger Blau für Überschriften
- Gold als Akzentfarbe
- linke Navigation bleibt beim Scrollen sichtbar
- dezente Neon- und Glow-Effekte nur noch bei Buttons, aktiver Navigation und Akzenten
- responsive Darstellung für Desktop, Tablet und Smartphone
- HTML, CSS und JavaScript sauber getrennt
- vorhandene SVG- und 3D-Grafiken integriert

Start:
index.html im Browser öffnen.

Hinweis:
Das Kontaktformular ist als Frontend vorbereitet. Für den echten Versand muss es
noch mit einem PHP-Skript verbunden werden.

Neue Menüfunktion:
- keine sichtbare Bildlaufleiste in der linken Menüspalte
- oben erscheint nur der Abwärtspfeil
- unten erscheint nur der Aufwärtspfeil
- in einer mittleren Position erscheinen beide Pfeile
- Mausrad, Touchpad und Tastatur funktionieren weiterhin
- der aktive Menüpunkt wird automatisch sichtbar gehalten

Neue Unterseite:
- wissenswertes.html
- Bereiche für Eltern, Schülerinnen und Schüler sowie Studierende
- vierter Bereich „Gemeinsam erfolgreich“ für die Zusammenarbeit zwischen
  Lernenden, Eltern und Lehrkraft
- Zielgruppen-Schnellnavigation
- FAQ-Bereich
- eigene, kommentierte Dateien css/wissenswertes.css und js/wissenswertes.js

Neue Unterseite:
- methodik.html
- Darstellung der tatsächlich eingesetzten und dokumentierten Methodik
- Alleinstellungsmerkmale:
  Bildhaftes Erkennen, Fragenmethode, 3-Minuten-Recherche-Regel,
  Lösungsblätter, Trendbeobachtung sowie geregelte Smartphone-Nutzung
- transparente Praxisnachweise und vorsichtige Leistungsdarstellung
- separate Dateien css/methodik.css und js/methodik.js

Neue Fächerstruktur:
- faecher.html als Gesamtübersicht
- mathematik.html
- physik.html
- chemie.html
- informatik.html
- jede Fachseite enthält Akkordeons zu den jeweiligen Themenbereichen
- Gesamtseite enthält ebenfalls Akkordeons mit allgemeinen Fragen
- eigene Dateien css/faecher.css und js/faecher.js

Navigationskorrektur:
- Scroll-Hervorhebung auf der Startseite arbeitet jetzt über data-nav-section.
- Der Bereich Fächer wird beim Scrollen über #faecher korrekt hervorgehoben,
  obwohl der Menülink auf faecher.html verweist.
- Mathematik, Physik, Chemie und Informatik markieren auf ihren Unterseiten
  dauerhaft den Hauptmenüpunkt Fächer.
- Methodik und Wissenswertes markieren ebenfalls dauerhaft ihren Hauptpunkt.
- Der aktive Menüpunkt wird automatisch im sichtbaren Bereich der Seitenleiste gehalten.

Scroll-Fehler korrigiert:
- scrollIntoView() für aktive Menüeinträge entfernt
- nur die interne Menüspalte wird verschoben
- Hauptseite startet ohne expliziten Anker immer oben
- alte Browser-Scrollpositionen werden nicht wiederhergestellt
- Akkordeons erzeugen keinen automatischen Seitensprung

Neue FAQ-Seite:
- faq.html
- FAQ-Suche mit Ergebnisanzeige
- Kategorien für Organisation, Methodik, Fortschritt, Online-Unterricht
  sowie Datenschutz und Kommunikation
- Inhalte aus StartmaterialienHomepage.docx und den dokumentierten
  Rückmeldungen abgeleitet
- FAQ als neuer Hauptmenüpunkt unter Wissenswertes
- css/faq.css und js/faq.js
