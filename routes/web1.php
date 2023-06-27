<?php

use App\Http\Controllers\ProfileController;
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

    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('Welcome');

    Route::prefix('category')->group(function () {
        Route::get('/', function () {
            return Inertia::render('ListDirectory');
        })->name('ListDirectory');

        Route::get('/GuideResolve', function () {
            return Inertia::render('GuideResolve');
        })->name('GuideResolve');

        Route::get('/ReportA3', function () {
            return Inertia::render('ReportA3');
        })->name('ReportA3');

        Route::get('/KaizenTop', function () {
            return Inertia::render('KaizenTop');
        })->name('KaizenTop');
    });

    Route::get('/blank', function () {
        return "Blank";
    })->name('blank');

    Route::get('/test2', function () {
        return Inertia::render('Test2');
    })->name('Test2');
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
