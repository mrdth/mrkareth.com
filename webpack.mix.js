let mix = require('laravel-mix');
mix
.postCss("app.css", "assets/css", [

     require("tailwindcss"),
    ]);