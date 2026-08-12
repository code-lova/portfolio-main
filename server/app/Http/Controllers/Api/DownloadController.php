<?php

namespace App\Http\Controllers\Api;

use App\Models\Settings;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function downloadCV()
    {
        $resumePath = Settings::where('id', '1')->value('resume_path');

        if (!$resumePath) {
            abort(404);
        }

        if (config('filesystems.uploads_disk') === 'cloudinary') {
            $disk = Storage::disk('cloudinary');

            if (!$disk->exists($resumePath)) {
                abort(404);
            }

            return response($disk->get($resumePath), 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="resume.pdf"',
            ]);
        }

        if (!File::exists($resumePath)) {
            abort(404);
        }

        return response()->download($resumePath, 'resume.pdf');
    }
}
