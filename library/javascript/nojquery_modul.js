console.log("--> Modul 'nachhilfe-modul.js' wurde im Hintergrund geladen.");

// Eine einfache Funktion exportieren
export function erstelleBegruessung(stadt) {
    return `Willkommen bei der professionellen Nachhilfe in ${stadt}!`;
}

// Eine mathematische Funktion exportieren
export function berechneNachhilfePreis(anzahlStunden, stundenSatz) {
    return anzahlStunden * stundenSatz;
}

// Eine ganze Klasse exportieren
export class NachhilfeLehrer {
    constructor(name, fach) {
        this.name = name;
        this.fach = fach;
    }

    vorstellen() {
        console.log(`Hallo, ich bin ${this.name} und unterrichte das Fach ${this.fach}.`);
    }
}
