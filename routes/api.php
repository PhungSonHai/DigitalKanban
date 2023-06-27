<?php

use App\Http\Controllers\TestController;
use App\Models\UserToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("test", [TestController::class, 'index']);
// Route::get("test2", function(){
//     $getUser = UserToken::query()->where('UserCode', 'sonhai-phung')->get();
//     return $getUser;
// });
Route::post("test2", function (Request $request) {
    $file = $request->file("file");

    if(!file_exists(public_path('uploads')."/".$file->getClientOriginalName())){
        echo $file->move(public_path('uploads'), $file->getClientOriginalName());   
    }else{
        echo "tồn tại";
    }
    return "ok";
});
