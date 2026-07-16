<?php
/**
 * easyIT Besucherzähler
 * Einbindung:
 * <?php require_once __DIR__ . '/includes/counter.php'; ?>
 */

if (!defined('DB_HOST')) {
    require_once __DIR__ . '/config.php';
}

try {

    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

    // IP-Adresse bestimmen
    $ip = $_SERVER['REMOTE_ADDR'];

    // nur einen Zugriff innerhalb von 30 Minuten zählen
    $sql = "
        SELECT COUNT(*) 
        FROM access_counter
        WHERE ip = ?
          AND date_time >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$ip]);

    if ($stmt->fetchColumn() == 0) {

        $stmt = $pdo->prepare("
            INSERT INTO access_counter(ip)
            VALUES(?)
        ");

        $stmt->execute([$ip]);

    }

}
catch(Exception $e){

    // keine Ausgabe erzeugen
}
?>