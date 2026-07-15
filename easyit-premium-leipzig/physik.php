<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Physik';
$currentPage = 'physik';
$subject = 'Physik';
$image = 'fach-physik.png';
$intro = 'Physik verbindet Beobachtung, Modell und Rechnung. Genau diese Verbindung steht im Mittelpunkt.';
$topics = explode(';', 'Mechanik;Elektrizitätslehre;Optik;Wärmelehre;Schwingungen und Wellen;Prüfungsvorbereitung');
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
require __DIR__ . '/includes/subject-page.php';
require __DIR__ . '/includes/footer.php';
