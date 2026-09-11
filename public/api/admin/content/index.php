<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/_bootstrap.php';

$initial = [
    'articles' => [
        ['id' => '1', 'category' => 'Ibadah & Kajian', 'date' => '24 April 2026', 'title' => 'Adab Imam dan Khatib di Dalam dan di Luar Ibadah', 'excerpt' => 'Pembahasan mengenai kelayakan menjadi imam, kewajiban meluruskan saf, pelaksanaan shalat yang ringkas dan sempurna, serta adab seorang khatib.', 'content' => 'Imam dan khatib memegang amanah penting dalam membimbing jamaah.', 'image' => '/aktivitas-adab-imam-khatib.png'],
    ],
    'heroConfig' => ['englishVideo' => '/hero-video.mp4', 'welcomeTitleId' => "Pondok Pesantren Bina Ummah Qur'aniyah", 'welcomeTitleEn' => "Bina Ummah Qur'aniyah Foundation", 'welcomeTitleAr' => 'مؤسسة بناء الأمة القرآنية', 'welcomeDescId' => 'Pondok Pesantren yang bercirikan Tahfidz Al-Quran.', 'welcomeDescEn' => 'An Islamic Boarding School specializing in Tahfidz Al-Quran.', 'welcomeDescAr' => 'مؤسسة تعليمية إسلامية متخصصة في تحفيظ القرآن الكريم.'],
    'messages' => [],
    'settings' => ['secretariatTitle' => 'Sekretariat YBUQ', 'address' => 'Jl. Lapangan Merah 1 No. 99, RT 011/RW 007, Kel. Srengseng Sawah, Kec. Jagakarsa, Jakarta Selatan 12640', 'email' => 'info@ybuq.or.id', 'phone1' => '0815 8949 619', 'phone2' => '0856 7558 840', 'operatingHours' => '08:00 – 17:00 WIB (Setiap Hari)', 'instagramUrl' => 'https://www.instagram.com/bina_ummah_quraniyah/', 'youtubeUrl' => 'https://www.youtube.com/@BinaUmmahQuraniyah'],
];

$store = ybuq_read_store('content', $initial);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!ybuq_is_admin()) {
        ybuq_json(['success' => false, 'message' => 'Sesi admin diperlukan'], 401);
    }
    $type = (string)($_GET['type'] ?? '');
    $map = ['articles' => 'articles', 'hero' => 'heroConfig', 'messages' => 'messages', 'settings' => 'settings'];
    ybuq_json(['success' => true, 'data' => isset($map[$type]) ? ($store[$map[$type]] ?? []) : $store]);
}

if ($method !== 'POST') {
    ybuq_json(['success' => false, 'message' => 'Metode tidak diizinkan'], 405);
}

$body = ybuq_request_body();
$type = (string)($body['type'] ?? '');
$action = (string)($body['action'] ?? '');
$data = is_array($body['data'] ?? null) ? $body['data'] : [];

// Contact form submissions remain public; all CMS operations require an admin session.
if (!($type === 'message' && $action === 'create') && !ybuq_is_admin()) {
    ybuq_json(['success' => false, 'message' => 'Sesi admin diperlukan'], 401);
}

if ($type === 'article') {
    if ($action === 'create') {
        $data['id'] = (string)round(microtime(true) * 1000);
        $data['date'] = $data['date'] ?? date('d-m-Y');
        array_unshift($store['articles'], $data);
    } elseif ($action === 'update') {
        foreach ($store['articles'] as &$article) {
            if (($article['id'] ?? '') === ($data['id'] ?? '')) $article = array_merge($article, $data);
        }
        unset($article);
    } elseif ($action === 'delete') {
        $store['articles'] = array_values(array_filter($store['articles'], fn($item) => ($item['id'] ?? '') !== ($data['id'] ?? '')));
    } else {
        ybuq_json(['success' => false, 'message' => 'Aksi artikel tidak valid'], 400);
    }
} elseif ($type === 'hero') {
    $store['heroConfig'] = array_merge($store['heroConfig'], $data);
} elseif ($type === 'settings') {
    $store['settings'] = array_merge($store['settings'], $data);
} elseif ($type === 'message') {
    if ($action === 'create') {
        $data['id'] = 'msg-' . round(microtime(true) * 1000);
        $data['createdAt'] = date('Y-m-d H:i');
        $data['read'] = false;
        array_unshift($store['messages'], $data);
    } elseif ($action === 'markRead') {
        foreach ($store['messages'] as &$message) {
            if (($message['id'] ?? '') === ($data['id'] ?? '')) $message['read'] = true;
        }
        unset($message);
    } elseif ($action === 'delete') {
        $store['messages'] = array_values(array_filter($store['messages'], fn($item) => ($item['id'] ?? '') !== ($data['id'] ?? '')));
    } else {
        ybuq_json(['success' => false, 'message' => 'Aksi pesan tidak valid'], 400);
    }
} else {
    ybuq_json(['success' => false, 'message' => 'Tipe tidak valid'], 400);
}

ybuq_write_store('content', $store);
ybuq_json(['success' => true, 'data' => $data]);
