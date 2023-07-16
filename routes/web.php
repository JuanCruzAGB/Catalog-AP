<?php
  use App\Http\Controllers\Controller;
  use Illuminate\Support\Facades\Route;

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

// * Controller - Controls the web in general.
  Route::get('/', [ Controller::class, 'index', ])
    ->name('index');

  Route::get('/properties', [ Controller::class, 'index', ])
    ->name('catalog');

  Route::get('/properties/{slug}', [ Controller::class, 'index', ])
    ->name('property');