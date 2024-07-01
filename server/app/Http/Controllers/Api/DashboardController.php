<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Category;
use App\Models\ContactMessage as ModelsContactMessage;
use App\Models\Counter;
use App\Models\Project;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function logVisit()
    {
        $counter = Counter::first();
        if ($counter) {
            $counter->increment('views');
        } else {
            Counter::create(['views' => 1]);
        }
        return response()->json(['message' => 'Visit logged']);
    }

    public function getVisits()
    {
        $count = Counter::sum('views');
        return response()->json(['visits' => $count]);
    }

    public function getProjects(){
        $count = Project::count();
        return response()->json([
            'projects' => $count
        ]);
    }

    public function getBlogs(){
        $count = Blog::count();
        return response()->json([
            'blogs' => $count
        ]);
    }

    public function getProjectCategory(){
        $count = Category::count();
        return response()->json([
            'projectCategory' => $count
        ]);
    }

    public function getBlogCategory(){
        $count = BlogCategory::count();
        return response()->json([
            'blogCategory' => $count
        ]);
    }

    public function getContactMessage(){
        $count = ModelsContactMessage::count();
        return response()->json([
            'message' => $count
        ]);
    }






}
