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
        Schema::create('aph_kaizen_month3', function (Blueprint $table) {
            $table->increments('id');
            $table->string("kaizen_order")->comment("Số thứ tự kaizen(1,2,3)");
            $table->integer("kaizen_year")->length(4)->comment("Năm đạt top kaizen");
            $table->integer("kaizen_month")->length(2)->comment("Tháng đạt top kaizen");

            $table->string("path_avatar")->comment("Ảnh của người cải tiến");
            $table->string("name")->comment("Tên của người cải tiến");
            $table->string("msnv")->comment("MSNV của người cải tiến");
            $table->string("department")->comment("Bộ phận của người cải tiến");
            $table->string("plant")->comment("Xưởng của người cải tiến");

            $table->string("after_image")->comment("Hình ảnh trước đây");
            $table->string("after_description")->comment("Mô tả trước đây");
            $table->string("current_image")->comment("Hình ảnh hiện tại");
            $table->string("current_description")->comment("Mô tả hiện tại");
            $table->string("benefit")->comment("Mô tả lợi ích");

            $table->boolean("upgrade_0")->comment("true hoặc false, Cải tiến: phẩm chất");
            $table->boolean("upgrade_1")->comment("true hoặc false, Cải tiến: năng suất");
            $table->boolean("upgrade_2")->comment("true hoặc false, Cải tiến: tiết kiệm");
            $table->boolean("upgrade_3")->comment("true hoặc false, Cải tiến: an toàn");
            $table->boolean("upgrade_4")->comment("true hoặc false, Cải tiến: sáng tạo");
            $table->boolean("upgrade_5")->comment("true hoặc false, Cải tiến: 6S");
            $table->boolean("upgrade_6")->comment("true hoặc false, Cải tiến: toàn diện");

            $table->string("line_at")->comment("Tại chuyền");
            $table->string("plant_at")->comment("Tại xưởng");
            $table->string("process_at")->comment("Tại công đoạn");
            $table->date("start_at")->comment("Từ ngày");
            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aph_kaizen_month');
    }
};
