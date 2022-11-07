<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('title', function (Blueprint $table) {
            $table->id();
            $table->integer('genre_id');
            $table->string('slug');
            $table->string('name');
            $table->string('author');
            $table->mediumText('summary')->nullable();
            $table->integer('year');
            $table->string('price')->nullable();
            $table->bigInteger('isbn');
            $table->string('cover')->nullable();
            $table->integer('pages');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('title');
    }
};
