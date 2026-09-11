<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $authenticated = ybuq_is_admin();
    ybuq_json([
        'authenticated' => $authenticated,
        'user' => $authenticated ? ['name' => 'Administrator YBUQ', 'email' => YBUQ_ADMIN_USER] : null,
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ybuq_json(['success' => false, 'message' => 'Metode tidak diizinkan'], 405);
}

$body = ybuq_request_body();
$action = (string)($body['action'] ?? '');

if ($action === 'logout') {
    ybuq_start_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
    ybuq_json(['success' => true, 'message' => 'Logout berhasil']);
}

if ($action !== 'login') {
    ybuq_json(['success' => false, 'message' => 'Aksi tidak dikenal'], 400);
}

$username = strtolower(trim((string)($body['username'] ?? '')));
$password = (string)($body['password'] ?? '');
$validUser = $username === YBUQ_ADMIN_USER || $username === 'admin';

if (!$validUser || !ybuq_verify_password($password)) {
    usleep(350000);
    ybuq_json(['success' => false, 'message' => 'Username atau password salah'], 401);
}

ybuq_start_session();
session_regenerate_id(true);
$_SESSION['ybuq_admin'] = true;
$_SESSION['ybuq_admin_user'] = YBUQ_ADMIN_USER;
ybuq_json(['success' => true, 'message' => 'Login berhasil']);
