<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Mathematik';
$currentPage = 'mathematik';
$subject = 'Mathematik';
$image = 'fach-mathematik.png';
$intro = 'Mathematik wird übersichtlich, wenn Strukturen sichtbar werden und jeder Schritt nachvollziehbar bleibt.';
$topics = explode(';', 'Grundlagen festigen;Algebra und Gleichungen;Geometrie und Vektoren;Analysis und Funktionen;Stochastik;Prüfungsvorbereitung');
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
require __DIR__ . '/includes/subject-page.php';
require __DIR__ . '/includes/footer.php';
