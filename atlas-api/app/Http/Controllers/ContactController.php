<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'asunto' => 'required|string|max:100',
            'mensaje' => 'required|string|max:2000',
        ]);

        try {
            Mail::to('contacto@tenri.cl')->send(new ContactMessage($validated));

            return response()->json([
                'success' => true,
                'message' => 'Mensaje enviado correctamente'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo enviar el mensaje. Intente más tarde.'
            ], 500);
        }
    }
}