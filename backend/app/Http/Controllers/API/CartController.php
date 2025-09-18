<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller
{
    // Afficher le panier de l'utilisateur connecté
    public function index(Request $request)
    {
        $cart = CartItem::with('product')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($cart, 200);
    }

    // Ajouter un produit au panier
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $user = $request->user();
        $product_id = $request->product_id;
        $quantity = $request->quantity ?? 1;

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->first();

        if ($cartItem) {
            // si déjà dans le panier, on augmente la quantité
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
                'quantity' => $quantity
            ]);
        }

        return response()->json($cartItem, 201);
    }

    // Supprimer un produit du panier
    public function remove(Request $request, $id)
    {
        $user = $request->user();
        $cartItem = CartItem::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Élément du panier non trouvé'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Élément supprimé'], 200);
    }
}
