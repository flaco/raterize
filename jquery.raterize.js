/* =========================================================
// jquery.raterize.js
// Yet Another Jquery Rating Plugin / Slightly slimmer than the rest / AJAX Friendly
// Web: http://www.nicholasklick.com
// Copyright: Nicholas Klick
========================================================= */
(function($) {
  $.fn.raterize = function(options) {
    var base = $.extend({}, $.fn.raterize.defaults, options);
    this.each(function(){
      
      var self = $(this);
      var items = self.find("input");
      var $global_wrapper = $("<span class='raterize_global_wrapper'></span>");
      var $ratings_wrapper = $("<span class='raterize_ratings_wrapper'></span>");
      var $input_wrapper = $("<span class='raterize_input_wrapper'></span>");
      
      var $set_default_ratings = function(){
        var v = items.filter(":checked").val();
        $(".raterize_rating.raterize_active").removeClass("raterize_active");
        $(".raterize_rating#raterize_item"+v).click();
      };
      
      $global_wrapper.insertAfter(self).html(self);
      items.filter(":first").before($ratings_wrapper);

      var i = 1;
      items.each(function(obj){
        var $rating_item = $("<a href='#' id='raterize_item"+i+"' class='raterize_rating'></a>");
        $(this).addClass("raterize_item"+i);
        $ratings_wrapper.append($rating_item);
        $(this).hide();
        i++;
      });
      
      $ratings_wrapper.append($input_wrapper);
      $input_wrapper.html(items);

      $(".raterize_rating").hover(function(){
        $(this).parents("raterize_ratings_wrapper").find(".raterize_rating.raterize_active").removeClass("raterize_active");
        $(this).addClass("raterize_active").prevAll().addClass("raterize_active");
      }, function() {
        $set_default_ratings();
      });

      $(".raterize_rating").live("click",function(){
        var current_id = $(this).attr('id');
        $(this).addClass("raterize_active").prevAll().addClass("raterize_active");
        $input_wrapper.find("input."+current_id).attr("checked",true);
        return false;
      });
      $set_default_ratings();
    });

  };
  $.fn.raterize.defaults = {};
  // Potential options: ?
})(jQuery);