<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    public function index(): JsonResponse
    {
        $genre = Genre::all();
        return response()->json([
            'status' => 200,
            'genre' => $genre,
        ]);
    }

    public function edit($id): JsonResponse
    {
        $genre = Genre::find($id);
        if ($genre) {
            return response()->json([
                'status' => 200,
                'genre' => $genre,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Genre ID Found.',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|max:255',
            'name' => 'required|max:255',
            'meta_title' => 'required|max:255',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $genre = Genre::find($id);
            if ($genre) {
                $genre->meta_title = $request->input('meta_title');
                $genre->meta_keyword = $request->input('meta_keyword');
                $genre->meta_description = $request->input('meta_description');
                $genre->slug = $request->input('slug');
                $genre->name = $request->input('name');
                $genre->description = $request->input('description');
                $genre->status = $request->input('status') ? '1' : '0';
                $genre->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Genre updated successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Genre ID not found',
                ]);
            }
        }
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|max:255',
            'name' => 'required|max:255',
            'meta_title' => 'required|max:255',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $genre = new Genre;
            $genre->meta_title = $request->input('meta_title');
            $genre->meta_keyword = $request->input('meta_keyword');
            $genre->meta_description = $request->input('meta_description');
            $genre->slug = $request->input('slug');
            $genre->name = $request->input('name');
            $genre->description = $request->input('description');
            $genre->status = $request->input('status') == true ? '1' : '0';
            $genre->save();
            return response()->json([
                'status' => 200,
                'message' => 'Genre added successfully',
            ]);
        }
    }
}
