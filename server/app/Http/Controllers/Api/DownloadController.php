<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function downloadCV()
    {
        $filePath = storage_path('app/public/document/jeremiah-ebizo-resume.pdf'); // path to file location

        if (!file_exists($filePath)) {
            abort(404);
        }

        return response()->download($filePath, 'jeremiah-ebizo-resume.pdf');
    }
}
