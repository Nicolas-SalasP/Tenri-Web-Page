<?php

namespace App\Http\Controllers;

use App\Models\BillingProfile;
use Illuminate\Http\Request;

class BillingProfileController extends Controller
{
    // Obtener todas las empresas del usuario autenticado
    public function index(Request $request)
    {
        return response()->json($request->user()->billingProfiles()->orderBy('created_at', 'desc')->get());
    }

    // Crear una nueva empresa
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rut' => 'required|string|max:20',
            'business_name' => 'required|string|max:255',
            'business_line' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'email_dte' => 'nullable|email|max:255',
            'is_default' => 'boolean'
        ]);

        $user = $request->user();

        if (empty($validated['is_default'])) {
            $validated['is_default'] = $user->billingProfiles()->count() === 0;
        }

        if ($validated['is_default']) {
            $user->billingProfiles()->update(['is_default' => false]);
        }

        $profile = $user->billingProfiles()->create($validated);

        return response()->json($profile, 201);
    }

    // Actualizar una empresa
    public function update(Request $request, $id)
    {
        $profile = $request->user()->billingProfiles()->findOrFail($id);

        $validated = $request->validate([
            'rut' => 'required|string|max:20',
            'business_name' => 'required|string|max:255',
            'business_line' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'email_dte' => 'nullable|email|max:255',
            'is_default' => 'boolean'
        ]);

        if (isset($validated['is_default']) && $validated['is_default']) {
            $request->user()->billingProfiles()->where('id', '!=', $id)->update(['is_default' => false]);
        }

        $profile->update($validated);

        return response()->json($profile);
    }

    // Eliminar una empresa
    public function destroy(Request $request, $id)
    {
        $profile = $request->user()->billingProfiles()->findOrFail($id);
        $profile->delete();

        if ($profile->is_default) {
            $latest = $request->user()->billingProfiles()->latest()->first();
            if ($latest) {
                $latest->update(['is_default' => true]);
            }
        }

        return response()->json(['message' => 'Perfil de facturación eliminado']);
    }
}