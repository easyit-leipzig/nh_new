# easyIT Nachhilfe Leipzig – Premium Startpaket

## Start
Das Paket benötigt PHP 8.1 oder neuer. Lokal kann es im Projektordner gestartet werden mit:

```bash
php -S localhost:8080
```

Danach `http://localhost:8080` öffnen.

## Vor Veröffentlichung ändern
- `config/site.php`: Telefonnummer, E-Mail und Standort
- `impressum.php`: vollständige Anbieterangaben
- `datenschutz.php`: rechtlich geprüfte Datenschutzerklärung
- `kontakt.php`: SMTP- oder Mailversand ergänzen

## Struktur
- PHP-Seiten im Stammverzeichnis
- wiederverwendbare Bestandteile in `includes/`
- Designsystem in `assets/css/styles.css`
- mobile Navigation und Animationen in `assets/js/app.js`
- PNG-Grafiken in `assets/img/`

Das Kontaktformular validiert Eingaben, versendet aber absichtlich noch keine Nachricht, da dafür die konkrete Hosting- und SMTP-Konfiguration erforderlich ist.
