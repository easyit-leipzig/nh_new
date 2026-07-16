<?php

if (!defined('DB_HOST')) {
    require_once __DIR__.'/config.php';
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

    $ip = $_SERVER['REMOTE_ADDR'];

    /*
     * Prüfen, ob die IP dauerhaft gesperrt wurde.
     */
    $stmt = $pdo->prepare("
        SELECT denied
        FROM access_counter
        WHERE ip=?
        ORDER BY id DESC
        LIMIT 1
    ");

    $stmt->execute([$ip]);

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && $row['denied']) {

        http_response_code(403);

        exit('Zugriff verweigert.');

    }

    /*
     * Nur einen Eintrag innerhalb von 30 Minuten erzeugen
     */

    $stmt = $pdo->prepare("
        SELECT COUNT(*)
        FROM access_counter
        WHERE ip=?
        AND date_time>=DATE_SUB(NOW(),INTERVAL 30 MINUTE)
    ");

    $stmt->execute([$ip]);

    if ($stmt->fetchColumn()==0){

        $stmt = $pdo->prepare("
            INSERT INTO access_counter
            (
                ip,
                denied,
                user_agent,
                referer,
                page
            )
            VALUES
            (
                ?,0,?,?,?
            )
        ");

        $stmt->execute([
            $ip,
            $_SERVER['HTTP_USER_AGENT'] ?? '',
            $_SERVER['HTTP_REFERER'] ?? '',
            $_SERVER['REQUEST_URI'] ?? ''
        ]);

    }

}
catch(Exception $e){

}