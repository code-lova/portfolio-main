<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Blog;
use Illuminate\Support\Str;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    //THESE ARE FUNCTION FOR THE BLOG CATEGORY
    public function storeBlogCategoryApi(Request $request) {
        try{
            $validator = Validator::make($request->all(), [
                'name'=> 'required|max:121|string',
                'slug' => 'required',
                'meta_title' => 'required',
                'meta_keyword' => 'required',
                'meta_description' => 'required',
                'status' => 'required'
            ],[
                'name.required'=> 'Category Name is required',
                'slug.required'=> 'The Slug is Necessary',
            ]);

            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors(),
                ]);
            }else{
                $blogCategory = new BlogCategory();
                $blogCategory->name = $request->name;
                $blogCategory->slug = Str::slug($request->slug);
                $blogCategory->meta_title = $request->meta_title;
                $blogCategory->meta_keyword = $request->meta_keyword;
                $blogCategory->meta_description = $request->meta_description;
                $blogCategory->status = $request->status == true ? '1': '0';
                $blogCategory->save();
                return response()->json([
                    'status' => 200,
                    'message' => "Blog Category Created."
                ]);
            }

        }catch(Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }


    public function fetchBlogCategoriesApi(){
        try{

            $blogCategories = BlogCategory::all();
            return response()->json([
                'status' => 200,
                'categories' => $blogCategories
            ]);


        }catch(Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }


    //Edit Categoory function
    public function EditBlogCategoryApi(int $id){
        try{

            $blogCatId = BlogCategory::findOrFail($id);
            if($blogCatId){
                return response()->json([
                    'status' => 200,
                    'category' => $blogCatId
                ]);
            }
        }catch(\Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function updateBlogCategoryApi(Request $request, int $id){
        try{
            $validator = Validator::make($request->all(), [
                'name'=> 'required|max:121|string',
                'slug' => 'required',
                'meta_title' => 'required',
                'meta_keyword' => 'required',
                'meta_description' => 'required',
                'status' => 'required'
            ],[
                'name.required'=> 'Category Name is required',
                'slug.required'=> 'The Slug is Necessary',
            ]);

            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors(),
                ]);
            }else{
                $blogCategory = BlogCategory::find($id);
                if($blogCategory){
                    $blogCategory->name = $request->name;
                    $blogCategory->slug = Str::slug($request->slug);
                    $blogCategory->meta_title = $request->meta_title;
                    $blogCategory->meta_keyword = $request->meta_keyword;
                    $blogCategory->meta_description = $request->meta_description;
                    $blogCategory->status = $request->status == true ? '1': '0';
                    $blogCategory->save();

                    return response()->json([
                        'status' => 200,
                        'message' => "Blog Category Updated."
                    ]);
                }else{
                    return response()->json([
                        'status' => 404,
                        'message' => 'No Record Found'
                    ]);
                }

            }
        }catch(\Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function deleteBlogCategoryApi(int $id){
        try{
            $blogCategory = BlogCategory::find($id);
            if($blogCategory){
                $blogCategory->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Blog Category Deleted'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Record ID Not Found'
                ]);
            }
        }catch(\Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }




    //THIS IS FUNCTION FOR THE BLOG

    public function storeBlogApi(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'blog_category_id'=> 'required',
                'title' => 'required|max:191',
                'description' => 'required',
                'image'=> 'required|mimes:jpeg,jpg,png,webp|max:2048',
                'meta_title' => 'required',
                'meta_keywords' => 'required',
                'meta_description' => 'required',
                'status' => 'required',
            ],[
                'title.required'=> 'Blog title is required',
                'description.required'=> 'Blog description is required',
            ]);

            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors(),
                ]);
            }else{
                $blog = new Blog();
                $blog->blog_category_id = $request->blog_category_id;
                $blog->title = $request->title;
                $blog->description = $request->description;
                $blog->meta_title = $request->meta_title;
                $blog->meta_keywords = $request->meta_keywords;
                $blog->meta_description = $request->meta_description;
                if($request->hasFile('image')){
                    $file = $request->file('image');
                    $filename = time() .'.'.$file->hashName();
                    $file->move('uploads/blog/', $filename);
                    $blog->image = 'uploads/blog/'.$filename;

                }
                $blog->status = $request->status == true ? '1': '0';
                $blog->save();
                return response()->json([
                    'status' => 200,
                    'message' => "New Blog was Created."
                ]);
            }

        }catch(Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function fetchBlogApi(){
        try{
            $blogs = Blog::all();
            return response()->json([
                'status' => 200,
                'blogs' => $blogs
            ]);
        }catch(Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }

    public function EditBlogApi(int $id) {
        try{

            $blogId = Blog::findOrFail($id);
            if($blogId){
                return response()->json([
                    'status' => 200,
                    'blog' => $blogId
                ]);
            }
        }catch(\Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function updateBlogApi(Request $request, int $id){
        try{
            $validator = Validator::make($request->all(), [
                'blog_category_id'=> 'required',
                'title' => 'required|max:191',
                'description' => 'required',
                'meta_title' => 'required',
                'meta_keywords' => 'required',
                'meta_description' => 'required',
                'status' => 'required',
            ],[
                'title.required'=> 'Blog title is required',
                'description.required'=> 'Blog description is required',
            ]);

            if($validator->fails()){
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors(),
                ]);
            }else{
                $blog = Blog::findOrFail($id);
                $blog->blog_category_id = $request->blog_category_id;
                $blog->title = $request->title;
                $blog->description = $request->description;
                $blog->meta_title = $request->meta_title;
                $blog->meta_keywords = $request->meta_keywords;
                $blog->meta_description = $request->meta_description;
                if($request->hasFile('image')){

                    $destination_path = $blog->image;
                    if(File::exists($destination_path)){
                        File::delete($destination_path);
                    }
                    $file = $request->file('image');
                    $filename = time() .'.'.$file->hashName();
                    $file->move('uploads/blog/', $filename);
                    $blog->image = 'uploads/blog/'.$filename;

                }
                $blog->status = $request->status == true ? '1': '0';
                $blog->save();
                return response()->json([
                    'status' => 200,
                    'message' => "Blog Updated Successfully."
                ]);
            }

        }catch(Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function deleteBlogApi(int $id){
        try{
            $blog = Blog::find($id);
            if($blog){
                $blog->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Blog Deleted Successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Record ID Not Found'
                ]);
            }
        }catch(\Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }

}
