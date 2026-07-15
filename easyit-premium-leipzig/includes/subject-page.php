<?php
/** @var string $subject */
/** @var string $image */
/** @var string $intro */
/** @var array<int,string> $topics */
?>
<main class="main-content" id="main-content">
<section class="page-hero glass-card reveal">
    <div><p class="eyebrow">Fachbereich</p><h1><?= e($subject) ?></h1><p class="lead"><?= e($intro) ?></p><a class="button button-primary" href="kontakt.php">Probestunde anfragen</a></div>
    <img src="assets/img/<?= e($image) ?>" alt="" width="340" height="340">
</section>
<section class="section-block"><div class="section-heading reveal"><p class="eyebrow">Schwerpunkte</p><h2>Typische Themen im Unterricht</h2></div><div class="topic-grid">
<?php foreach ($topics as $index => $topic): ?><article class="glass-card topic-card reveal"><span><?= str_pad((string)($index + 1), 2, '0', STR_PAD_LEFT) ?></span><h3><?= e($topic) ?></h3></article><?php endforeach; ?>
</div></section>
<section class="glass-card section-block content-card reveal"><h2>So arbeiten wir</h2><p>Wir beginnen bei dem Punkt, an dem Unsicherheit entsteht. Begriffe, Zusammenhänge und Rechenwege werden nicht nur vorgemacht, sondern gemeinsam entwickelt. Ziel ist ein belastbares Verständnis, das auch bei neuen Aufgaben trägt.</p></section>
</main>
