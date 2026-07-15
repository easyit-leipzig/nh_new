<?php
$pageTitle = $pageTitle ?? 'easyIT-Nachhilfe Leipzig';
$currentPage = $currentPage ?? '';
?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Individuelle Nachhilfe in Mathematik, Physik, Chemie und Informatik in Leipzig – verständlich, persönlich und nachhaltig.">
  <meta name="theme-color" content="#0057b8">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/style.css">
  <script src="assets/js/main.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main-content">Zum Inhalt springen</a>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.php" aria-label="easyIT-Nachhilfe Startseite">
      <span class="brand-mark" aria-hidden="true">eIT</span>
      <span><strong>easyIT</strong><small>Nachhilfe Leipzig</small></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">
      <span></span><span></span><span></span><span class="sr-only">Menü öffnen</span>
    </button>
    <nav id="main-nav" class="main-nav" aria-label="Hauptnavigation">
      <a href="index.php" <?= $currentPage === 'home' ? 'aria-current="page"' : '' ?>>Start</a>
      <a href="prinzipien.php" <?= $currentPage === 'prinzipien' ? 'aria-current="page"' : '' ?>>Prinzipien</a>
      <a href="index.php#faecher">Fächer</a>
      <a href="index.php#ablauf">Ablauf</a>
      <a class="nav-cta" href="index.php#kontakt">Kontakt</a>
    </nav>
  </div>
</header>
