<?php

use App\Http\Controllers\API\GenreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('isAuthenticated', function () {
    return response()->json(['message' => 'Authenticated', 'status' => 200]);
});
// Genre
Route::post('add-genre', [GenreController::class, 'store']);
Route::get('view-genre', [GenreController::class, 'index']);
Route::get('edit-genre/{id}', [GenreController::class, 'edit']);
Route::put('update-genre/{id}', [GenreController::class, 'update']);
Route::post('delete-genre/{id}', [GenreController::class, 'delete']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
