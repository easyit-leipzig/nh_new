// Beim Öffnen des Skriptes werden die Module direkt importiert.
// Wichtig: Der relative Pfad "./" und die Endung ".js" sind im Browser Pflicht!
import { berechneNachhilfePreis, erstelleBegruessung, NachhilfeLehrer } from './nojquery_modul.js';

window.berechneNachhilfePreis = berechneNachhilfePreis;
window.erstelleBegruessung = erstelleBegruessung;
window.NachhilfeLehrer = NachhilfeLehrer;

console.log("--> Module sind jetzt auch in der F12-Konsole verfügbar!");

console.log("--> Hauptskript 'nojquery.js' wurde erfolgreich gestartet.");

// Beispiel 1: Aufruf einer einfachen Funktion aus dem Modul
const text = erstelleBegruessung("Leipzig");
console.log(text); 


// Beispiel 2: Aufruf einer mathematischen Funktion mit Parametern
const stunden = 4;
const preisProStunde = 25;
const gesamtKosten = berechneNachhilfePreis(stunden, preisProStunde);
console.log(`Kosten für ${stunden} Stunden Nachhilfe: ${gesamtKosten}€`);


// Beispiel 3: Instanziierung und Nutzung einer exportierten Klasse
const neuerLehrer = new NachhilfeLehrer("Herr Schmidt", "Mathematik");
neuerLehrer.vorstellen();
