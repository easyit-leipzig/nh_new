<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Kontakt';
$currentPage = 'kontakt';
$sent = false;
$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string)($_POST['name'] ?? ''));
    $email = filter_var((string)($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $message = trim((string)($_POST['message'] ?? ''));
    if ($name === '') $errors[] = 'Bitte geben Sie Ihren Namen an.';
    if ($email === false) $errors[] = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (mb_strlen($message) < 10) $errors[] = 'Bitte beschreiben Sie Ihr Anliegen etwas genauer.';
    if (!$errors) $sent = true; // Versand bewusst deaktiviert; Hosting-Konfiguration erforderlich.
}
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
?>
<main class="main-content" id="main-content"><section class="contact-layout"><div class="page-intro reveal"><p class="eyebrow">Kontakt</p><h1>Kostenlose Probestunde anfragen</h1><p class="lead">Nennen Sie Fach, Klassenstufe und aktuelles Thema. Die Anfrage wird nach Einrichtung des Mailversands serverseitig versendet.</p><div class="contact-facts glass-card"><p><strong>Telefon</strong><br><?= e($site['phone']) ?></p><p><strong>E-Mail</strong><br><?= e($site['email']) ?></p><p><strong>Region</strong><br><?= e($site['location']) ?></p></div></div><div class="glass-card form-card reveal">
<?php if ($sent): ?><div class="notice success">Vielen Dank. Das Formular wurde erfolgreich geprüft. Für den echten Versand muss in <code>kontakt.php</code> noch SMTP oder PHP-Mail eingerichtet werden.</div><?php endif; ?>
<?php if ($errors): ?><div class="notice error"><ul><?php foreach ($errors as $error): ?><li><?= e($error) ?></li><?php endforeach; ?></ul></div><?php endif; ?>
<form method="post" novalidate><label for="name">Name</label><input id="name" name="name" required><label for="email">E-Mail</label><input id="email" name="email" type="email" required><label for="subject">Fach / Klassenstufe</label><input id="subject" name="subject"><label for="message">Nachricht</label><textarea id="message" name="message" rows="7" required></textarea><button class="button button-primary" type="submit">Anfrage prüfen</button></form></div></section></main>
<?php require __DIR__ . '/includes/footer.php'; ?>
