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
        Schema::create('evaluate_meeting', function (Blueprint $table) {
            $table->increments('id');
            $table->string('line_code', 20)->comment("Mã chuyền");
            $table->date('evaluate_date')->nullable()->comment("Ngày thực hiện đánh giá");
            $table->integer('point_1')->length(1)->comment("Nội dung 1");
            $table->integer('point_2')->length(1)->comment("Nội dung 2");
            $table->integer('point_3')->length(1)->comment("Nội dung 3");
            $table->integer('point_4')->length(1)->comment("Nội dung 4");
            $table->integer('point_5')->length(1)->comment("Nội dung 5");
            $table->integer('point_6')->length(1)->comment("Nội dung 6");
            $table->integer('point_7')->length(1)->comment("Nội dung 7");
            $table->integer('point_8')->length(1)->comment("Nội dung 8");
            $table->integer('point_9')->length(1)->comment("Nội dung 9");
            $table->integer('point_10')->length(1)->comment("Nội dung 10");
            $table->integer('total_point')->length(2)->comment("Tổng điểm");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluate_meeting');
    }
};
