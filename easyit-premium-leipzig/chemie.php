<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Chemie';
$currentPage = 'chemie';
$subject = 'Chemie';
$image = 'fach-chemie.png';
$intro = 'Chemische Vorgänge werden verständlich, wenn Teilchenmodell, Reaktionsschema und Rechnung zusammengedacht werden.';
$topics = explode(';', 'Atombau;Periodensystem;Reaktionsgleichungen;Säuren und Basen;Organische Chemie;Stöchiometrie');
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
require __DIR__ . '/includes/subject-page.php';
require __DIR__ . '/includes/footer.php';
