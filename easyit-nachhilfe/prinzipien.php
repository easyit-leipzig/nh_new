<?php
$pageTitle = 'Unsere Prinzipien | easyIT-Nachhilfe Leipzig';
$currentPage = 'prinzipien';
require __DIR__ . '/includes/header.php';
$principles = [
 ['Verstehen statt Auswendiglernen','Nachhaltiges Lernen beginnt mit Verständnis. Formeln und Regeln werden nicht isoliert vermittelt, sondern aus nachvollziehbaren Zusammenhängen entwickelt. Dadurch können neue Aufgaben selbstständig eingeordnet und gelöst werden.'],
 ['Jeder Mensch lernt anders','Ein Erklärungsweg, der für eine Person funktioniert, muss für eine andere nicht passend sein. Tempo, Beispiele und Übungsformen werden deshalb individuell gewählt und bei Bedarf verändert.'],
 ['Fragen sind ausdrücklich erwünscht','Eine Frage zeigt nicht Schwäche, sondern den genauen Punkt, an dem Lernen beginnen kann. Wir schaffen eine Atmosphäre, in der Unsicherheiten offen ausgesprochen und ohne Druck geklärt werden können.'],
 ['Fehler gehören zum Lernprozess','Fehler werden nicht nur verbessert, sondern untersucht. Gemeinsam klären wir, ob eine Grundlage fehlt, eine Aufgabe falsch gelesen wurde oder der Lösungsweg noch nicht sicher ist.'],
 ['Lernen mit Bildern und Beispielen','Abstrakte Inhalte werden verständlicher, wenn sie sichtbar oder mit vertrauten Situationen verknüpft werden. Skizzen, Modelle und Alltagsbeispiele helfen, Strukturen dauerhaft zu erkennen.'],
 ['Hilfe zur Selbsthilfe','Ich löse Aufgaben nicht einfach vor. Durch gezielte Fragen und kleine Denkanstöße entstehen eigene Lösungswege. Die Unterstützung wird schrittweise reduziert, sobald mehr Sicherheit vorhanden ist.'],
 ['Eigenständige Recherche fördern','Zur Selbstständigkeit gehört auch, geeignete Informationen zu finden. Deshalb trainieren wir einen sinnvollen Rechercheweg: zuerst vorhandene Hilfsmittel, dann gezielte digitale Suche und anschließend eine klare Rückfrage.'],
 ['Digitale Medien sinnvoll einsetzen','Computer, Tablet und Smartphone können Lernen unterstützen, wenn sie zielgerichtet verwendet werden. Simulationen, Visualisierungen und geeignete Lernwerkzeuge ergänzen den persönlichen Unterricht.'],
 ['Motivation entsteht durch Fortschritt','Große Ziele werden in erreichbare Schritte zerlegt. Wer erkennt, was bereits besser gelingt, entwickelt neue Zuversicht und ist eher bereit, sich auch an schwierige Aufgaben heranzuwagen.'],
 ['Grundlagen zuerst sichern','Viele aktuelle Probleme entstehen durch ältere Lücken. Wir identifizieren die entscheidenden Grundlagen und schließen sie so gezielt wie nötig, bevor darauf neue Inhalte aufgebaut werden.'],
 ['Ehrlichkeit und Transparenz','Es gibt keine pauschalen Versprechen und keine garantierten Noten. Es gibt eine ehrliche Einschätzung, klare Ziele, nachvollziehbare Rückmeldungen und konsequente gemeinsame Arbeit.'],
 ['Lernen soll wieder Freude machen','Angst und Frust blockieren Aufmerksamkeit. Eine ruhige, respektvolle Atmosphäre schafft Raum für Neugier, Erfolgserlebnisse und das Gefühl: Ich kann das verstehen.']
];
?>
<main id="main-content">
  <section class="subhero">
    <div class="reveal"><p class="eyebrow">Unsere Haltung</p><h1>Zwölf Prinzipien für nachhaltige Nachhilfe.</h1><p>Die Prinzipien von easyIT beschreiben nicht nur, was im Unterricht geschieht, sondern warum wir so arbeiten. Sie verbinden fachliche Klarheit mit Vertrauen, Selbstständigkeit und realistischen Lernschritten.</p></div>
  </section>
  <section class="section principles-intro">
    <div class="quote-panel reveal"><span>„</span><blockquote>Mein Ziel ist nicht, Aufgaben für Schülerinnen und Schüler zu lösen. Mein Ziel ist, sie in die Lage zu versetzen, zukünftige Aufgaben selbstständig zu bearbeiten.</blockquote></div>
  </section>
  <section class="section principle-list" aria-label="Prinzipien der easyIT-Nachhilfe">
    <?php foreach ($principles as $index => $principle): ?>
      <article class="principle-card reveal">
        <div class="principle-index"><?= str_pad((string)($index + 1), 2, '0', STR_PAD_LEFT) ?></div>
        <div><h2><?= htmlspecialchars($principle[0], ENT_QUOTES, 'UTF-8') ?></h2><p><?= htmlspecialchars($principle[1], ENT_QUOTES, 'UTF-8') ?></p></div>
      </article>
    <?php endforeach; ?>
  </section>
  <section class="section cta-panel reveal">
    <div><p class="eyebrow">Prinzipien werden erst im Handeln sichtbar</p><h2>Der passende Lernweg beginnt mit einem Gespräch.</h2></div>
    <a class="button button-primary" href="index.php#kontakt">Kontakt aufnehmen</a>
  </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
