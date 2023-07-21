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
        Schema::table('aph_issue_production', function (Blueprint $table) {
            $table->string('issue_of', 1)->comment('Vấn đề thuộc công đoạn');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aph_issue_production', function (Blueprint $table) {
            //
        });
    }
};
