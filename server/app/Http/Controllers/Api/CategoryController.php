<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function storeCategoryApi(Request $request) {
        try{
            $validator = Validator::make($request->all(), [
                'name'=> 'required|max:121|string',
                'slug' => 'required',
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
                $category = new Category();
                $category->name = $request->name;
                $category->slug = Str::slug($request->slug);
                $category->status = $request->status == true ? '1': '0';
                $category->save();

                return response()->json([
                    'status' => 200,
                    'message' => "Category Created Successfully."
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


    public function fetchCategoriesApi(){
        try{

            $categories = Category::all();
            return response()->json([
                'status' => 200,
                'categories' => $categories
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
    public function EditCategoryApi(int $id){
        try{

            $categoryId = Category::findOrFail($id);
            if($categoryId){
                return response()->json([
                    'status' => 200,
                    'category' => $categoryId
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



    public function updateCategoryApi(Request $request, int $id){
        try{
            $validator = Validator::make($request->all(), [
                'name'=> 'required|max:121|string',
                'slug' => 'required',
                'status' => 'required'
            ],[
                'name.required'=> 'Category Name is required',
                'slug.required'=> 'The Slug is Necessary',
            ]);
            if($validator->fails()){
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            }else{
                $category = Category::find($id);
                if($category){
                    $category->name = $request->name;
                    $category->slug = Str::slug($request->slug);
                    $category->status = $request->status == true ? '1': '0';
                    $category->save();

                    return response()->json([
                        'status' => 200,
                        'message' => "Category Updated Successfully."
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



    public function deleteCategoryApi(int $id){
        try{
            $category = Category::find($id);
            if($category){
                $category->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Category Deleted Successfully'
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
