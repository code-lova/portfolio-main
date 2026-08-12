<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/up', function () {
    return response()->json(['status' => 'ok']);
});

// Temporary one-time endpoint to run PortfolioDataSeeder without shell access.
// Remove this route once the data has been imported.
Route::get('/internal/seed-portfolio-data/{token}', function (string $token) {
    $expected = env('SEED_TOKEN');

    if (!$expected || !hash_equals($expected, $token)) {
        abort(404);
    }

    Artisan::call('db:seed', ['--class' => 'PortfolioDataSeeder', '--force' => true]);

    return response()->json([
        'status' => 'done',
        'output' => Artisan::output(),
    ]);
});

Auth::routes(['verify' => true]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
