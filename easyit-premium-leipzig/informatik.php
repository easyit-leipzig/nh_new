<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Informatik';
$currentPage = 'informatik';
$subject = 'Informatik';
$image = 'fach-informatik.png';
$intro = 'Informatik bedeutet, Probleme zu zerlegen, Abläufe zu strukturieren und Lösungen systematisch zu testen.';
$topics = explode(';', 'Algorithmen;Programmierung;Datenbanken;Webentwicklung;Netzwerke;Prüfungsvorbereitung');
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
require __DIR__ . '/includes/subject-page.php';
require __DIR__ . '/includes/footer.php';
