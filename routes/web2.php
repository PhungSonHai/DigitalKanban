<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\EvaluateMeetingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('verifyMes')->group(function () {
    Route::prefix('category')->group(function () {
        Route::get('/guide', function () {
            return Inertia::render('Guide');
        })->name('guide');

        Route::get('/insert-kaizen', function () {
            return Inertia::render('InsertInfoKaizen');
        })->name('insertKaizen');
    });

    Route::prefix('KPIBoard')->group(function() {
        Route::get('/detail-issue', function() {
            return Inertia::render('DetailIssue');
        })->name('detailIssue');

        Route::get('/follow-meeting', function() {
            return Inertia::render('FollowMeeting');
        })->name('followMeeting');

        Route::prefix('review-meeting')->group(function() {
            Route::get('/', function() {
                return Inertia::render('ReviewMeeting');
            })->name('reviewMeeting');

            Route::post('/create-evaluate', [EvaluateMeetingController::class, 'create'])->name('reviewMeeting');
        });
    });
});

Route::get('/test', function () {
    return Inertia::render('Test', []);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
