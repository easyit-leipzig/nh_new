<?php /** @var string $currentPage */ ?>
<aside class="sidebar" id="sidebar">
    <nav class="main-nav" aria-label="Hauptnavigation">
        <a class="nav-item<?= is_active('start', $currentPage) ?>" href="index.php"><span>01</span>Startseite</a>
        <a class="nav-item<?= is_active('mathematik', $currentPage) ?>" href="mathematik.php"><span>02</span>Mathematik</a>
        <a class="nav-item<?= is_active('physik', $currentPage) ?>" href="physik.php"><span>03</span>Physik</a>
        <a class="nav-item<?= is_active('chemie', $currentPage) ?>" href="chemie.php"><span>04</span>Chemie</a>
        <a class="nav-item<?= is_active('informatik', $currentPage) ?>" href="informatik.php"><span>05</span>Informatik</a>
        <a class="nav-item<?= is_active('konzept', $currentPage) ?>" href="konzept.php"><span>06</span>Konzept</a>
        <a class="nav-item<?= is_active('kontakt', $currentPage) ?>" href="kontakt.php"><span>07</span>Kontakt</a>
    </nav>
    <div class="sidebar-card">
        <p class="eyebrow">Leipzig</p>
        <strong>Kostenlose Probestunde</strong>
        <p>Unverbindlich kennenlernen, Lernstand besprechen und nächste Schritte festlegen.</p>
        <a href="kontakt.php">Termin anfragen →</a>
    </div>
</aside>
