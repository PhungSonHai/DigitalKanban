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
        Schema::create('aph_issue_production', function (Blueprint $table) {
            $table->increments('id');
            $table->string('line_code', 20)->comment("Mã chuyền");
            $table->string('affect')->comment("Ảnh hưởng");
            $table->string('reason')->comment("Nguyên nhân");
            $table->string('description_reason')->comment("Mô tả nguyên nhân");
            $table->string('action_resolve')->comment("Hành động giải quyết");
            $table->string('responsible')->comment("Người chịu trách nhiệm");
            $table->integer('is_solved')->length(1)->default(0)->comment("Trạng thái giải quyết");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aph_issue_production');
    }
};
