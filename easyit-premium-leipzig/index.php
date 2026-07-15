<?php
declare(strict_types=1);
$site = require __DIR__ . '/config/site.php';
require __DIR__ . '/includes/functions.php';
$pageTitle = 'Individuelle Nachhilfe';
$currentPage = 'start';
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/sidebar.php';
?>
<main class="main-content" id="main-content">
    <section class="hero glass-card reveal">
        <div class="hero-copy">
            <p class="eyebrow">easyIT · Nachhilfe in Leipzig</p>
            <h1>Verstehen beginnt dort, wo Erklären persönlich wird.</h1>
            <p class="lead">Individuelle Nachhilfe in Mathematik, Physik, Chemie und Informatik – klar strukturiert, gezielt vorbereitet und auf den aktuellen Lernstand abgestimmt.</p>
            <div class="button-row">
                <a class="button button-primary" href="kontakt.php">Kostenlose Probestunde</a>
                <a class="button button-ghost" href="#faecher">Fächer entdecken</a>
            </div>
            <ul class="trust-list" aria-label="Vorteile">
                <li>Persönliche Begleitung</li><li>Klare Lernstruktur</li><li>Leipzig & Umgebung</li>
            </ul>
        </div>
        <div class="hero-visual">
            <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
            <img src="assets/img/hero-wissenschaft.png" alt="Illustration zu Mathematik, Naturwissenschaften und Informatik" width="620" height="420">
        </div>
    </section>

    <section class="section-block" id="faecher">
        <div class="section-heading reveal"><p class="eyebrow">Fächer</p><h2>Vier Bereiche. Ein gemeinsames Ziel: wirklich verstehen.</h2></div>
        <div class="subject-grid">
            <a class="subject-card subject-math reveal" href="mathematik.php"><img src="assets/img/fach-mathematik.png" alt="" width="300" height="300"><div><span>Mathematik</span><p>Grundlagen, Algebra, Geometrie, Analysis und Prüfungsvorbereitung.</p></div></a>
            <a class="subject-card subject-physics reveal" href="physik.php"><img src="assets/img/fach-physik.png" alt="" width="300" height="300"><div><span>Physik</span><p>Mechanik, Elektrizitätslehre, Optik und verständliche Modellbildung.</p></div></a>
            <a class="subject-card subject-chemistry reveal" href="chemie.php"><img src="assets/img/fach-chemie.png" alt="" width="300" height="300"><div><span>Chemie</span><p>Stoffe, Reaktionen, Gleichgewichte und sichere Rechenwege.</p></div></a>
            <a class="subject-card subject-cs reveal" href="informatik.php"><img src="assets/img/fach-informatik.png" alt="" width="300" height="300"><div><span>Informatik</span><p>Algorithmen, Programmierung, Datenbanken und systematisches Denken.</p></div></a>
        </div>
    </section>

    <section class="feature-grid section-block">
        <article class="glass-card feature-card reveal"><span class="feature-number">01</span><h3>Individuell vorbereitet</h3><p>Aufgaben, Erklärungen und Materialien orientieren sich am aktuellen Unterricht und an konkreten Wissenslücken.</p></article>
        <article class="glass-card feature-card reveal"><span class="feature-number">02</span><h3>Bildhaft erklärt</h3><p>Komplexe Zusammenhänge werden sichtbar, greifbar und Schritt für Schritt nachvollziehbar.</p></article>
        <article class="glass-card feature-card reveal"><span class="feature-number">03</span><h3>Nachhaltig gelernt</h3><p>Nicht nur die nächste Aufgabe lösen, sondern Muster erkennen und selbstständiger arbeiten.</p></article>
    </section>

    <section class="process glass-card section-block reveal">
        <div class="section-heading"><p class="eyebrow">Ablauf</p><h2>Vom ersten Gespräch zum eigenen Lösungsweg</h2></div>
        <ol class="process-list">
            <li><span>1</span><div><strong>Lernstand klären</strong><p>Ziele, Themen und Schwierigkeiten werden gemeinsam eingeordnet.</p></div></li>
            <li><span>2</span><div><strong>Unterricht vorbereiten</strong><p>Passende Beispiele, Aufgaben und Visualisierungen entstehen vorab.</p></div></li>
            <li><span>3</span><div><strong>Verstehen aufbauen</strong><p>Fragen, Erklärungen und Übungen führen schrittweise zur sicheren Anwendung.</p></div></li>
            <li><span>4</span><div><strong>Fortschritt sichern</strong><p>Ergebnisse werden geordnet und die nächsten Lernschritte festgelegt.</p></div></li>
        </ol>
    </section>

    <section class="cta glass-card reveal">
        <div><p class="eyebrow">Starten</p><h2>Eine gute Probestunde beginnt mit einem offenen Gespräch.</h2><p>Schildern Sie kurz das Fach, die Klassenstufe und das aktuelle Thema.</p></div>
        <a class="button button-primary" href="kontakt.php">Anfrage senden</a>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
