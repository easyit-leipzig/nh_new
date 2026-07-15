<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Impressum'; $currentPage = '';
require __DIR__ . '/includes/header.php'; require __DIR__ . '/includes/sidebar.php';
?>
<main class="main-content" id="main-content"><article class="glass-card legal-card"><p class="eyebrow">Rechtliches</p><h1>Impressum</h1><p><strong>Platzhalter:</strong> Vor Veröffentlichung müssen hier die vollständigen und rechtlich geprüften Angaben ergänzt werden.</p><h2>Anbieter</h2><p>Name<br>Straße und Hausnummer<br>PLZ Leipzig</p><h2>Kontakt</h2><p>Telefon: <?= e($site['phone']) ?><br>E-Mail: <?= e($site['email']) ?></p></article></main>
<?php require __DIR__ . '/includes/footer.php'; ?>
