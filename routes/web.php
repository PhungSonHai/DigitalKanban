<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Web\EvaluateMeetingController;
use App\Http\Controllers\Web\IssueProductionController;
use Illuminate\Http\Request;
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
        
        Route::get('/guide', function () {
            return Inertia::render('Guide');
        })->name('guide');

        Route::get('/insert-kaizen', function () {
            return Inertia::render('InsertInfoKaizen');
        })->name('insertKaizen');

        Route::get('/config-display-tv', function () {
            return Inertia::render('ConfigDisplayTV');
        })->name('configDisplayTV');
    });

    Route::get('/KaizenTop', function () {
        return Inertia::render('KaizenTop');
    })->name('KaizenTop');

    

    Route::prefix('KPIBoard')->group(function() {
        Route::get('/', function () {
            return Inertia::render('KPIBoard');
        })->name('KPIBoard');

        Route::get('/detail-issue', function() {
            return Inertia::render('DetailIssue');
        })->name('detailIssue');

        Route::post('/add-issue', [IssueProductionController::class, 'addIssue'])->name('addIssue');
        Route::post('/get-issue-of-line', [IssueProductionController::class, 'getIssueOfLine'])->name('getIssueOfLine');
        Route::get('/getall-issue', [IssueProductionController::class, 'getAllIssue'])->name('getAllIssue');
        Route::post('/complete-issue', [IssueProductionController::class, 'completeIssue'])->name('completeIssue');
        Route::post('/cancel-issue', [IssueProductionController::class, 'cancelIssue'])->name('cancelIssue');
        Route::post('/statistic-issue', [IssueProductionController::class, 'statisticIssue'])->name('statisticIssue');
        Route::post('/fill-issue', [IssueProductionController::class, 'fillIssue'])->name('fillIssue');
        Route::post('/score-evaluate', [IssueProductionController::class, 'scoreEvaluate'])->name('scoreEvaluate');

        Route::prefix('/follow-meeting')->group(function() {
            Route::get('/', function() {
                return Inertia::render('FollowMeeting');
            })->name('followMeeting');

            Route::get('/getall-evaluate', [EvaluateMeetingController::class, 'getAllEvaluate'])->name('getAllEvaluate');

            Route::post('/getlist-point', [EvaluateMeetingController::class, 'getListPoint'])->name('getListPoint');
        });

        Route::prefix('review-meeting')->group(function() {
            Route::get('/', function() {
                return Inertia::render('ReviewMeeting');
            })->name('reviewMeeting');

            Route::post('/create-evaluate', [EvaluateMeetingController::class, 'create'])->name('createEvaluate');
        });
    });

    Route::prefix('KPIBoardGrid')->group(function() {
        Route::get('/', function () {
            return Inertia::render('KPIBoardGrid');
        })->name('KPIBoardGrid');

        Route::get('/detail-issue', function() {
            return Inertia::render('DetailIssue');
        })->name('detailIssue');

        Route::post('/add-issue', [IssueProductionController::class, 'addIssue'])->name('addIssue');
        Route::post('/get-issue-of-line', [IssueProductionController::class, 'getIssueOfLine'])->name('getIssueOfLine');
        Route::get('/getall-issue', [IssueProductionController::class, 'getAllIssue'])->name('getAllIssue');
        Route::post('/complete-issue', [IssueProductionController::class, 'completeIssue'])->name('completeIssue');
        Route::post('/cancel-issue', [IssueProductionController::class, 'cancelIssue'])->name('cancelIssue');
        Route::post('/statistic-issue', [IssueProductionController::class, 'statisticIssue'])->name('statisticIssue');
        Route::post('/fill-issue', [IssueProductionController::class, 'fillIssue'])->name('fillIssue');
        Route::post('/score-evaluate', [IssueProductionController::class, 'scoreEvaluate'])->name('scoreEvaluate');

        Route::prefix('/follow-meeting')->group(function() {
            Route::get('/', function() {
                return Inertia::render('FollowMeeting');
            })->name('followMeeting');

            Route::get('/getall-evaluate', [EvaluateMeetingController::class, 'getAllEvaluate'])->name('getAllEvaluate');

            Route::post('/getlist-point', [EvaluateMeetingController::class, 'getListPoint'])->name('getListPoint');
        });

        Route::prefix('review-meeting')->group(function() {
            Route::get('/', function() {
                return Inertia::render('ReviewMeeting');
            })->name('reviewMeeting');

            Route::post('/create-evaluate', [EvaluateMeetingController::class, 'create'])->name('createEvaluate');
        });
    });

    // Route::prefix('KPIBoardGridChild')->group(function() {
    //     Route::get('/', function () {
    //         return Inertia::render('KPIBoardGridChild');
    //     })->name('KPIBoardGridChild');
    // });
});


require __DIR__ . '/web1.php';
require __DIR__ . '/web2.php';
