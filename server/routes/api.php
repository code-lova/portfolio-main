<?php

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DownloadController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ContactMessageController;



Route::middleware(['auth:sanctum', 'admin'])->group(function(){
    Route::get('/checkAuthorized', function(){
        return response()-> json([
            'message' => 'SUCCESS',
            'status' => 200
        ], 200);
    });


    // Other admin routes
    Route::controller(\App\Http\Controllers\Api\CategoryController::class)->group(function (){
        Route::post('/create-category', 'storeCategoryApi');
        Route::get('/categories', 'fetchCategoriesApi');
        Route::get('edit-category/{id}', 'EditCategoryApi');
        Route::post('update-category/{id}', 'updateCategoryApi');
        Route::delete('delete-category/{id}', 'deleteCategoryApi');
    });

    Route::controller(\App\Http\Controllers\Api\ProjectController::class)->group(function (){
        Route::post('/store-project', 'storeProjectApi');
        Route::get('/fetch-project', 'fetchProjectApi');
        Route::get('/edit-project/{id}', 'EditProjectApi');
        Route::post('update-project/{id}', 'updateProjectApi');
        Route::delete('delete-project/{id}', 'deleteProjectApi');
    });

    //Everything related to blog including blog-category
    Route::controller(\App\Http\Controllers\Api\BlogController::class)->group(function (){
        Route::post('/create-blog-category', 'storeBlogCategoryApi');
        Route::get('/blog-categories', 'fetchBlogCategoriesApi');
        Route::get('edit-blog-category/{id}', 'EditBlogCategoryApi');
        Route::post('update-blog-category/{id}', 'updateBlogCategoryApi');
        Route::delete('delete-blog-category/{id}', 'deleteBlogCategoryApi');

        //blog
        Route::post('/store-blog', 'storeBlogApi');
        Route::get('/fetch-blog', 'fetchBlogApi');
        Route::get('/edit-blog/{id}', 'EditBlogApi');
        Route::post('update-blog/{id}', 'updateBlogApi');
        Route::delete('delete-blog/{id}', 'deleteBlogApi');

    });

    Route::controller(\App\Http\Controllers\Api\SettingsController::class)->group(function (){
        //settings-password
        Route::post('/update-admin-password', 'UpdatePasswordApi');
        Route::post('update-switch-settings', 'updateSettingsApi');

    });

    Route::controller(\App\Http\Controllers\Api\DashboardController::class)->group(function() {
        Route::get('/visits', 'getVisits');
        Route::get('/projects-count', 'getProjects');
        Route::get('/blog-count', 'getBlogs');
        Route::get('/project-category-count', 'getProjectCategory');
        Route::get('/blog-category-count', 'getBlogCategory');
        Route::get('/contact-message-count', 'getContactMessage');
    });


});


Route::controller(\App\Http\Controllers\Api\AuthController::class)->group(function(){
    Route::post('register', 'RegisterApi'); //This api route was not created take note
    Route::post('login', 'LoginApi');
});

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('logout', [AuthController::class, 'logoutApi']);
});

Route::controller(\App\Http\Controllers\Api\FrontendController::class)->group(function(){
    Route::get('fetch-projects', 'fetchProjectsApi');
    Route::get('fetch-blogs', 'fetchBlogsApi');
});

Route::post('/log-visit', [DashboardController::class, 'logVisit']);
Route::post('/contact-message', [ContactMessageController::class, 'ContactMessageApi']);
Route::get('/download-cv', [DownloadController::class, 'downloadCV']);


//FORGOT PASSWORD FUNCTION
Route::post('/forgot-password', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
    ],[
        'email.required' => 'A valid email is required to proceed'
    ]);
    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->errors(),
        ]);
    }
    $status = Password::sendResetLink($request->only('email'));
    return $status === Password::RESET_LINK_SENT
        ? response()->json(['status' => 200, 'message' => __($status)])
        : response()->json(['status' => 401, 'message' => __($status)]);
})->middleware('guest')->name('password.email');


//RESET PASSWORD FUNCTION
Route::post('/reset-password', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ],[
        'password.confirmed' => 'Password does not match',
        'password.min' => 'Password is too short'
    ]);
    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->errors(),
        ]);
    }

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));
            $user->save();
            event(new PasswordReset($user));
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['status' => 200, 'message' => __($status)])
        : response()->json(['status' => 498, 'message' => __($status)]);
})->middleware('guest')->name('password.update');

