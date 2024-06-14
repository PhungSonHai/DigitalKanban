<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('aph_line_of_account', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->comment("Tài khoản");
            $table->string('line_code', 20)->comment("Mã chuyền");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aph_line_of_account');
    }
};
