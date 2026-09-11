<?php
declare(strict_types=1);

const YBUQ_ADMIN_USER = 'admin@ybuq.or.id';
const YBUQ_ADMIN_PASSWORD_SALT = '47fb237fb7320d67b559c7b8b21f7966';
const YBUQ_ADMIN_PASSWORD_HASH = '45c2213bfff967c957d22bc82eaf56c8e1e1e812aae5bed7a1a9419af6c4e2cb';

function ybuq_verify_password(string $password): bool
{
    $candidate = hash_pbkdf2('sha256', $password, YBUQ_ADMIN_PASSWORD_SALT, 210000, 64);
    return hash_equals(YBUQ_ADMIN_PASSWORD_HASH, $candidate);
}

function ybuq_json(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ybuq_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    session_name('ybuq_admin_session');
    session_set_cookie_params([
        'lifetime' => 86400,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function ybuq_is_admin(): bool
{
    ybuq_start_session();
    return isset($_SESSION['ybuq_admin']) && $_SESSION['ybuq_admin'] === true;
}

function ybuq_request_body(): array
{
    $raw = file_get_contents('php://input');
    $body = json_decode($raw ?: '{}', true);
    return is_array($body) ? $body : [];
}

function ybuq_data_dir(): string
{
    $documentRoot = rtrim((string)($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
    $base = $documentRoot !== '' ? dirname($documentRoot) : sys_get_temp_dir();
    $directory = $base . DIRECTORY_SEPARATOR . 'ybuq_admin_data';
    if (!is_dir($directory)) {
        mkdir($directory, 0750, true);
    }
    return $directory;
}

function ybuq_read_store(string $name, array $fallback): array
{
    $path = ybuq_data_dir() . DIRECTORY_SEPARATOR . $name . '.json';
    if (!is_file($path)) {
        ybuq_write_store($name, $fallback);
        return $fallback;
    }
    $decoded = json_decode((string)file_get_contents($path), true);
    return is_array($decoded) ? $decoded : $fallback;
}

function ybuq_write_store(string $name, array $data): void
{
    $path = ybuq_data_dir() . DIRECTORY_SEPARATOR . $name . '.json';
    $temporary = $path . '.tmp';
    file_put_contents($temporary, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    rename($temporary, $path);
}
