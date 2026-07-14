<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Expires" content="Fri, Jan 01 1900 00:00:00 GMT">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Lang" content="en">
<meta name="author" content="">
<meta http-equiv="Reply-to" content="@.com">
<meta name="generator" content="PhpED 8.0">
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="creation-date" content="09/06/2012">
<meta name="revisit-after" content="15 days">
<title>Untitled</title>
<style type="">

/* Grundgestaltung des Containers */
.accordion-container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Abstand zwischen den Tabs */
}

/* Styling der einzelnen Akkordeon-Boxen */
.accordion-container details {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* Visuelles Feedback beim Drüberfahren (Hover) */
.accordion-container details:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.08);
}

/* Styling der anklickbaren Kopfzeile */
.accordion-container summary {
  padding: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  list-style: none; /* Entfernt den Standard-Pfeil im Firefox */
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

/* Entfernt den Standard-Pfeil in Chrome/Safari/Edge */
.accordion-container summary::-webkit-details-marker {
  display: none;
}

/* Eigenen, modernen Pfeil via Custom-Icon hinzufügen */
.accordion-container summary::after {
  content: '';
  width: 8px;
  height: 8px;
  border-right: 2px solid #64748b;
  border-bottom: 2px solid #64748b;
  transform: rotate(-45deg); /* Zeigt nach rechts */
  transition: transform 0.2s ease;
}

/* CSS-Zustand, wenn das Akkordeon geöffnet ist */
.accordion-container details[open] {
  border-color: #3b82f6; /* Blauer Fokus-Rand */
}

/* Drehung des Pfeils nach unten, wenn geöffnet */
.accordion-container details[open] summary::after {
  transform: rotate(45deg);
  border-color: #3b82f6;
}

/* Styling für den Inhaltsbereich */
.accordion-container .content {
  padding: 0 1.25rem 1.25rem 1.25rem;
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
  border-top: 1px solid #f1f5f9; /* Trennlinie zum Header */
  animation: slideDown 0.2s ease-out; /* Sanftes Einblenden */
}

/* Animation für das Öffnen */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
</head>
<body>
  <div class="accordion-container">
  <!-- Item 1 -->
  <details name="faq-accordion" open>
    <summary>Was ist der Vorteil von modernem HTML-Akkordeons?</summary>
    <div class="content">
      <p>Sie benötigen keinerlei JavaScript, sind extrem performant, von Haus aus barrierefrei und lassen sich mit wenigen Zeilen CSS ansprechend gestalten.</p>
    </div>
  </details>

  <!-- Item 2 -->
  <details name="faq-accordion">
    <summary>Wie funktioniert das automatische Schließen?</summary>
    <div class="content">
      <p>Durch das gleiche <code>name="..."</code> Attribut auf allen <code>&lt;details&gt;</code> Elementen weiß der Browser, dass immer nur ein Tab gleichzeitig geöffnet sein darf.</p>
    </div>
  </details>

  <!-- Item 3 -->
  <details name="faq-accordion">
    <summary>Ist dieser Code responsiv?</summary>
    <div class="content">
      <p>Ja, das Layout passt sich automatisch an jede Bildschirmgröße an – vom Smartphone bis zum großen Desktop-Monitor.</p>
    </div>
  </details>
</div>

</body>
</html>
