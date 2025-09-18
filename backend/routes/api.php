<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController; 
use App\Http\Controllers\API\CartController;

// Routes publiques
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {

    
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [AuthController::class, 'user']);
    Route::put('profile', [AuthController::class, 'updateProfile']);
    Route::delete('profile', [AuthController::class, 'deleteProfile']);

    // Products API
    Route::apiResource('products', ProductController::class);

    // Cart API
    Route::get('cart', [CartController::class, 'index']);
    Route::post('cart/add', [CartController::class, 'add']);
    Route::delete('cart/{id}', [CartController::class, 'remove']);    
});
