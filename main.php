<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nachhilfe Leipzig - Professionelle Leistungsdarstellung</title>
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
/* Globale Neon- & Leipzig-Variablen */
:root {
    --leipzig-blue: #005EA8;      /* Original Stadtwappen-Blau */
    --leipzig-dark: #002c52;      /* Abgedunkeltes Blau für Hintergründe */
    --leipzig-deep: #00182e;      /* Tiefes Dunkelblau für Header/Sidebar */
    --neon-blue: #1F51FF;         /* Neon-Blau für Akzente */
    --neon-glow: rgba(31, 81, 255, 0.5);
    --text-light: #ffffff;
    --text-muted: #a3c2db;
}

/* Global Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body.leipzig-grid-body {
    background: linear-gradient(135deg, var(--leipzig-dark) 0%, var(--leipzig-blue) 100%);
    color: var(--text-light);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* --- 1. KOPFZEILE (HEADER) --- */
.main-header {
    background-color: var(--leipzig-deep);
    border-bottom: 2px solid var(--neon-blue);
    box-shadow: 0 4px 15px var(--neon-glow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.neon-accent {
    color: #fff;
    text-shadow: 0 0 8px var(--neon-blue);
}

.top-nav a {
    color: var(--text-muted);
    text-decoration: none;
    margin-left: 20px;
    font-weight: 500;
    transition: color 0.3s ease;
}

.top-nav a:hover, .top-nav a.active {
    color: #fff;
    text-shadow: 0 0 5px var(--neon-blue);
}

/* --- LAYOUT WRAPPER (ZWEI-SPALTEN-STRUKTUR) --- */
.layout-wrapper {
    display: flex;
    flex: 1; /* Füllt den Raum zwischen Header und Footer */
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 30px;
    gap: 30px;
}

/* --- 2. SEITENLEISTE (SIDEBAR) --- */
.left-sidebar {
    flex: 0 0 280px; /* Feste Breite der Sidebar */
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.sidebar-widget {
    background: rgba(0, 24, 46, 0.7);
    border: 1px solid rgba(31, 81, 255, 0.3);
    border-radius: 10px;
    padding: 20px;
}

.sidebar-widget h3 {
    font-size: 1.1rem;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--neon-blue);
    padding-bottom: 5px;
}

.sidebar-widget p {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 15px;
}

.sidebar-btn {
    display: block;
    text-align: center;
    text-decoration: none;
    color: #fff;
    border: 1px solid var(--neon-blue);
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    box-shadow: 0 0 5px var(--neon-glow);
    transition: all 0.3s ease;
}

.sidebar-btn:hover {
    background: var(--neon-blue);
    box-shadow: 0 0 15px var(--neon-blue);
}

.subject-list {
    list-style: none;
}

.subject-list li {
    padding: 8px 0;
    font-size: 0.95rem;
    color: var(--text-muted);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* --- 3. HAUPTINHALT (MAIN CONTENT) --- */
.main-content {
    flex: 1; /* Nutzt den restlichen verfügbaren Platz */
    background: rgba(0, 44, 82, 0.4);
    border-radius: 10px;
    padding: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.neon-title {
    font-size: 2.3rem;
    color: #fff;
    text-shadow: 0 0 10px var(--neon-blue);
    margin-bottom: 10px;
}

.lead-text {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 30px;
}

.content-box {
    line-height: 1.7;
}

.content-box h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
}

/* --- 4. FUSSZEILE (FOOTER) --- */
.main-footer {
    background-color: var(--leipzig-deep);
    border-top: 1px solid rgba(31, 81, 255, 0.3);
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-top: auto;
}

.footer-links a {
    color: var(--text-muted);
    text-decoration: none;
    margin-left: 20px;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: #fff;
    text-shadow: 0 0 5px var(--neon-blue);
}

/* --- RESPONSIVE ANPASSUNGEN (MOBILE FIRST) --- */
@media (max-width: 768px) {
    .main-header {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
    }
    
    .top-nav a {
        margin: 0 10px;
    }

    .layout-wrapper {
        flex-direction: column; /* Sidebar rückt über den Hauptinhalt */
        padding: 15px;
        gap: 20px;
    }

    .left-sidebar {
        flex: none;
        width: 100%;
    }

    .main-content {
        padding: 25px;
    }

    .main-footer {
        flex-direction: column;
        gap: 10px;
        text-align: center;
        padding: 20px;
    }
    
    .footer-links a {
        margin: 0 10px;
    }
}

</style>
</head>
<body class="leipzig-grid-body">

    <!-- 1. KOPFZEILE (HEADER) -->
    <header class="main-header">
        <div class="logo">
            <span class="logo-icon">⚡</span> Nachhilfe <span class="neon-accent">Leipzig</span>
        </div>
        <nav class="top-nav">
            <a href="index.php" class="active">Start</a>
            <a href="leistungen.php">Leistungen</a>
            <a href="kontakt.php">Kontakt</a>
        </nav>
    </header>

    <!-- CONTAINER FÜR SIDEBAR + INHALT -->
    <div class="layout-wrapper">

        <!-- 2. SEITENLEISTE LINKS (SIDEBAR) -->
        <aside class="left-sidebar">
            <div class="sidebar-widget">
                <h3>Schnellkontakt</h3>
                <p>Direkte Anfrage für eine kostenlose Probestunde.</p>
                <a href="kontakt.php" class="sidebar-btn">Jetzt Anfragen</a>
            </div>
            <div class="sidebar-widget">
                <h3>Fächer</h3>
                <ul class="subject-list">
                    <li>Mathematik</li>
                    <li>Physik</li>
                    <li>Deutsch</li>
                    <li>Englisch</li>
                </ul>
            </div>
        </aside>

        <!-- 3. HAUPTINHALT (MAIN CONTENT) -->
        <main class="main-content">
            <h1 class="neon-title">Leistungsdarstellung</h1>
            <p class="lead-text">Individuelle Förderung für nachhaltigen Schulerfolg.</p>
            
            <div class="content-box">
                <h2>Unser Konzept</h2>
                <p>Mit fundiertem Fachwissen und Geduld holen wir Schüler genau dort ab, wo Wissenslücken bestehen. Unser Unterricht orientiert sich strikt am sächsischen Lehrplan, um bestmögliche Ergebnisse in Klassenarbeiten und Abschlussprüfungen zu erzielen.</p>
            </div>
        </main>

    </div>

    <!-- 4. FUSSZEILE (FOOTER) -->
    <footer class="main-footer">
        <p>&copy; 2026 Nachhilfe Leipzig. Alle Rechte vorbehalten.</p>
        <div class="footer-links">
            <a href="impressum.php">Impressum</a>
            <a href="datenschutz.php">Datenschutz</a>
        </div>
    </footer>

</body>
</html>
