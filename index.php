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
<style>
/* Globale Variablen für einfache Farbanpassungen */
:root {
    --leipzig-blue: #005EA8;      /* Das originale Blau aus dem Stadtwappen */
    --leipzig-dark: #002c52;      /* Abgedunkeltes Wappenblau für Tiefenwirkung */
    --neon-blue: #1F51FF;         /* Elektrisierendes Neon-Blau für Akzente */
    --neon-glow: rgba(31, 81, 255, 0.6);
    --text-light: #ffffff;
    --text-muted: #a3c2db;
}

/* Container mit dem Leipziger Basis-Blau */
.leipzig-neon-container {
    background: linear-gradient(135deg, var(--leipzig-dark) 0%, var(--leipzig-blue) 100%);
    color: var(--text-light);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 60px 20px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.services-hero {
    max-width: 1200px;
    width: 100%;
    text-align: center;
}

/* Neon-Überschrift mit Glow-Effekt */
.neon-text {
    font-size: 2.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #fff;
    text-shadow: 0 0 5px #fff, 
                 0 0 10px #fff, 
                 0 0 20px var(--neon-blue), 
                 0 0 40px var(--neon-blue);
    margin-bottom: 10px;
}

.subtitle {
    color: var(--text-muted);
    font-size: 1.2rem;
    margin-bottom: 50px;
}

/* Modernes, voll-responsives CSS Grid */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
}

/* Die einzelnen Leistungskarten */
.service-card {
    background: rgba(0, 44, 82, 0.6); /* Dunkler Kontrast zum Hintergrund */
    border: 1px solid rgba(31, 81, 255, 0.3);
    border-radius: 12px;
    padding: 30px;
    text-align: left;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

/* Hover-Effekt: Karte fängt an in Neon-Blau zu leuchten */
.service-card:hover {
    transform: translateY(-5px);
    border-color: var(--neon-blue);
    box-shadow: 0 0 15px var(--neon-glow);
    background: rgba(0, 44, 82, 0.8);
}

.card-icon {
    font-size: 2rem;
    color: var(--neon-blue);
    text-shadow: 0 0 8px var(--neon-glow);
    margin-bottom: 15px;
}

.service-card h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #fff;
}

.service-card p {
    color: var(--text-muted);
    line-height: 1.6;
    font-size: 0.95rem;
    margin-bottom: 20px;
}

.badge {
    display: inline-block;
    background: rgba(31, 81, 255, 0.15);
    border: 1px solid var(--neon-blue);
    color: #fff;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    text-transform: uppercase;
}

/* Pulsierender Neon-Call-to-Action-Button */
.cta-wrapper {
    margin-top: 40px;
}

.neon-button {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    border: 2px solid var(--neon-blue);
    padding: 15px 35px;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px var(--neon-glow);
}

.neon-button:hover {
    background: var(--neon-blue);
    color: var(--leipzig-dark);
    box-shadow: 0 0 25px var(--neon-blue);
    transform: scale(1.03);
}

/* Responsive Anpassungen für kleine Smartphones */
@media (max-width: 480px) {
    .neon-text {
        font-size: 2rem;
    }
    .leipzig-neon-container {
        padding: 40px 15px;
    }
}

</style>
</head>
<body>
  <main class="leipzig-neon-container">
    <section class="services-hero">
        <h1 class="neon-text">Professionelle Nachhilfe</h1>
        <p class="subtitle">Effektive Leistungsförderung von der Grundschule bis zum Abitur.</p>
        
        <div class="services-grid">
            <!-- Leistungs-Karte 1 -->
            <div class="service-card">
                <div class="card-icon">∑</div>
                <h3>Mathematik & Physik</h3>
                <p>Gezielte Vorbereitung auf Klassenarbeiten, Klausuren und das Abitur. Strukturierter Aufbau von Logik und Rechenwegen.</p>
                <span class="badge">Alle Klassen</span>
            </div>

            <!-- Leistungs-Karte 2 -->
            <div class="service-card">
                <div class="card-icon">A</div>
                <h3>Sprachen (DE / EN)</h3>
                <p>Verbesserung von Grammatik, Textverständnis und freiem Sprechen. Individuelle Förderung für schnelle Notensprünge.</p>
                <span class="badge">Gymnasium / Real</span>
            </div>

            <!-- Leistungs-Karte 3 -->
            <div class="service-card">
                <div class="card-icon">⚡</div>
                <h3>Prüfungs-Crashkurse</h3>
                <p>Intensive Blockkurse in den Ferien. Perfekt abgestimmt auf die sächsischen Lehrpläne und Abschlussprüfungen.</p>
                <span class="badge">Prüfungsphase</span>
            </div>
        </div>

        <div class="cta-wrapper">
            <a href="kontakt.php" class="neon-button">Jetzt Probestunde anfragen</a>
        </div>
    </section>
</main>

</body>
</html>
