<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('billing_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Datos del SII para Facturación
            $table->string('rut', 20);
            $table->string('business_name');
            $table->string('business_line');
            $table->string('address');
            $table->string('city')->nullable();
            $table->string('email_dte')->nullable();

            // Control de UI
            $table->boolean('is_default')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_profiles');
    }
};