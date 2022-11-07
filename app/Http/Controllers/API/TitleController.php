<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Title;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TitleController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'genre_id' => 'required|max:255',
            'slug' => 'required|max:255',
            'name' => 'required|max:255',
            'author' => 'required|max:255',
            'summary' => 'max:255',
            'price' => 'max:20',
            'year' => 'required|max:4',
            'isbn' => 'required',
            'pages' => 'required',
            'cover' => 'image|mimes:jpeg,jpg,png|max:2048',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $title = new Title;
            $title->genre_id = $request->input('genre_id');
            $title->slug = $request->input('slug');
            $title->name = $request->input('name');
            $title->author = $request->input('author');
            $title->summary = $request->input('summary');
            $title->year = $request->input('year');
            $title->price = $request->input('price');
            $title->isbn = $request->input('isbn');
            $title->pages = $request->input('pages');

            if ($request->hasFile('cover')) {
                $file = $request->file('cover');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/title/', $filename);
                $title->cover = 'uploads/title/' . $filename;
            }

            $title->save();

            return response()->json([
                'status' => 200,
                'message' => 'Title added successfully',
            ]);
        }
    }
}
