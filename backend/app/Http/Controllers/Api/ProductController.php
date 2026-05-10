<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    // ADD
    public function store(Request $request)
    {
        $imageName = null;

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
        }

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'image' => $imageName,
        ]);

        return response()->json($product);
    }

    // UPDATE (FIXED FOR FORMDATA)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $imageName = $product->image;

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
        }

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'image' => $imageName,
        ]);

        return response()->json($product);
    }

    // DELETE
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            @unlink(public_path('images/' . $product->image));
        }

        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }
}