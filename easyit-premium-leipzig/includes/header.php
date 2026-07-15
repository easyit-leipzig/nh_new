<?php
/** @var array<string,string> $site */
/** @var string $pageTitle */
/** @var string $currentPage */
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Individuelle Nachhilfe in Mathematik, Physik, Chemie und Informatik in Leipzig.">
    <meta name="theme-color" content="#0057b8">
    <title><?= e($pageTitle) ?> | <?= e($site['site_name']) ?></title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <script defer src="assets/js/app.js"></script>
</head>
<body>
<a class="skip-link" href="#main-content">Zum Hauptinhalt</a>
<div class="ambient ambient-one" aria-hidden="true"></div>
<div class="ambient ambient-two" aria-hidden="true"></div>
<header class="topbar">
    <a class="brand" href="index.php" aria-label="easyIT Nachhilfe Leipzig – Startseite">
        <img src="assets/img/logo-easyit.png" alt="easyIT Nachhilfe Leipzig" width="180" height="92">
    </a>
    <div class="topbar-copy">
        <strong>Nachhilfe mit System</strong>
        <span>Mathematik · Physik · Chemie · Informatik</span>
    </div>
    <div class="topbar-actions">
        <a class="contact-link" href="tel:<?= e(preg_replace('/\s+/', '', $site['phone']) ?? '') ?>"><?= e($site['phone']) ?></a>
        <a class="button button-primary" href="kontakt.php">Probestunde</a>
        <button class="menu-toggle" type="button" aria-controls="sidebar" aria-expanded="false">
            <span></span><span></span><span></span><span class="sr-only">Menü öffnen</span>
        </button>
    </div>
</header>
<div class="site-shell">
