<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Unterrichtskonzept';
$currentPage = 'konzept';
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
?>
<main class="main-content" id="main-content"><section class="page-intro reveal"><p class="eyebrow">Konzept</p><h1>Nachhilfe, die Denken sichtbar macht.</h1><p class="lead">Der Unterricht verbindet klare Struktur, bildhafte Erklärungen, gezielte Fragen und selbstständiges Anwenden.</p></section><section class="feature-grid section-block"><article class="glass-card feature-card reveal"><span class="feature-number">A</span><h2>Erkennen</h2><p>Vorwissen und Unsicherheiten werden sichtbar gemacht.</p></article><article class="glass-card feature-card reveal"><span class="feature-number">B</span><h2>Verstehen</h2><p>Zusammenhänge werden schrittweise entwickelt und erklärt.</p></article><article class="glass-card feature-card reveal"><span class="feature-number">C</span><h2>Anwenden</h2><p>Neue Aufgaben zeigen, ob das Verständnis wirklich trägt.</p></article></section></main>
<?php require __DIR__ . '/includes/footer.php'; ?>
