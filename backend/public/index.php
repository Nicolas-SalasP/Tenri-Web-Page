<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$basePath = __DIR__.'/../';
if (str_contains(__DIR__, 'public_html')) {
    $basePath = '/home/atlasdig/atlas_project/';
}

if (file_exists($maintenance = $basePath.'storage/framework/maintenance.php')) {
    require $maintenance;
}

require $basePath.'vendor/autoload.php';
$app = require_once $basePath.'bootstrap/app.php';

$app->handleRequest(Request::capture());