<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('class_id');
            $table->string('material_title');
            $table->text('materials_data');
            $table->string('image_url')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('class_id')
                ->references('id')
                ->on('classrooms')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('materials');
    }
}
;