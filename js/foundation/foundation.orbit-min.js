!function($,t){"use strict";function i(e,s){this.$element=e,this.options=$.extend({},i.defaults,this.$element.data(),s),this._init(),t.registerPlugin(this),t.Keyboard.register("Orbit",{ltr:{ARROW_RIGHT:"next",ARROW_LEFT:"previous"},rtl:{ARROW_LEFT:"next",ARROW_RIGHT:"previous"}})}i.defaults={bullets:!0,navButtons:!0,animInFromRight:"slide-in-right",animOutToRight:"slide-out-right",animInFromLeft:"slide-in-left",animOutToLeft:"slide-out-left",autoPlay:!0,timerDelay:5e3,infiniteWrap:!0,swipe:!0,pauseOnHover:!0,accessible:!0,containerClass:"orbit-container",slideClass:"orbit-slide",boxOfBullets:"orbit-bullets",nextClass:"orbit-next",prevClass:"orbit-previous",useMUI:!0},i.prototype._init=function(){this.$wrapper=this.$element.find("."+this.options.containerClass),this.$slides=this.$element.find("."+this.options.slideClass);var i=this.$element.find("img"),e=this.$slides.filter(".is-active");e.length||this.$slides.eq(0).addClass("is-active"),this.options.useMUI||this.$slides.addClass("no-motionui"),i.length?t.onImagesLoaded(i,this._prepareForOrbit.bind(this)):this._prepareForOrbit(),this.options.bullets&&this._loadBullets(),this._events(),this.options.autoPlay&&this.geoSync(),this.options.accessible&&this.$wrapper.attr("tabindex",0)},i.prototype._loadBullets=function(){this.$bullets=this.$element.find("."+this.options.boxOfBullets).find("button")},i.prototype.geoSync=function(){var i=this;this.timer=new t.Timer(this.$element,{duration:this.options.timerDelay,infinite:!1},function(){i.changeSlide(!0)}),this.timer.start()},i.prototype._prepareForOrbit=function(){var t=this;this._setWrapperHeight(function(i){t._setSlideHeight(i)})},i.prototype._setWrapperHeight=function(t){var i=0,e,s=0;this.$slides.each(function(){e=this.getBoundingClientRect().height,$(this).attr("data-slide",s),s&&$(this).css({position:"relative",display:"none"}),i=e>i?e:i,s++}),s===this.$slides.length&&(this.$wrapper.css({height:i}),t(i))},i.prototype._setSlideHeight=function(t){this.$slides.each(function(){$(this).css("max-height",t)})},i.prototype._events=function(){var i=this;if(this.options.swipe&&this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit",function(t){t.preventDefault(),i.changeSlide(!0)}).on("swiperight.zf.orbit",function(t){t.preventDefault(),i.changeSlide(!1)}),this.options.autoPlay&&(this.$slides.on("click.zf.orbit",function(){i.$element.data("clickedOn",i.$element.data("clickedOn")?!1:!0),i.timer[i.$element.data("clickedOn")?"pause":"start"]()}),this.options.pauseOnHover&&this.$element.on("mouseenter.zf.orbit",function(){i.timer.pause()}).on("mouseleave.zf.orbit",function(){i.$element.data("clickedOn")||i.timer.start()})),this.options.navButtons){var e=this.$element.find("."+this.options.nextClass+", ."+this.options.prevClass);e.attr("tabindex",0).on("click.zf.orbit touchend.zf.orbit",function(){i.changeSlide($(this).hasClass(i.options.nextClass))})}this.options.bullets&&this.$bullets.on("click.zf.orbit touchend.zf.orbit",function(){if(/is-active/g.test(this.className))return!1;var t=$(this).data("slide"),e=t>i.$slides.filter(".is-active").data("slide"),s=i.$slides.eq(t);i.changeSlide(e,s,t)}),this.$wrapper.add(this.$bullets).on("keydown.zf.orbit",function(e){t.Keyboard.handleKey(e,i,{next:function(){i.changeSlide(!0)},previous:function(){i.changeSlide(!1)},handled:function(){$(e.target).is(i.$bullets)&&i.$bullets.filter(".is-active").focus()}})})},i.prototype.changeSlide=function(i,e,s){var n=this.$slides.filter(".is-active").eq(0);if(/mui/g.test(n[0].className))return!1;var o=this.$slides.first(),l=this.$slides.last(),a=i?"Right":"Left",r=i?"Left":"Right",h=this,d;d=e?e:i?this.options.infiniteWrap?n.next("."+this.options.slideClass).length?n.next("."+this.options.slideClass):o:n.next("."+this.options.slideClass):this.options.infiniteWrap?n.prev("."+this.options.slideClass).length?n.prev("."+this.options.slideClass):l:n.prev("."+this.options.slideClass),d.length&&(this.options.bullets&&(s=s||this.$slides.index(d),this._updateBullets(s)),this.options.useMUI?(t.Motion.animateIn(d.addClass("is-active").css({position:"absolute",top:0}),this.options["animInFrom"+a],function(){d.css({position:"relative",display:"block"}).attr("aria-live","polite")}),t.Motion.animateOut(n.removeClass("is-active"),this.options["animOutTo"+r],function(){n.removeAttr("aria-live"),h.options.autoPlay&&h.timer.restart()})):(n.removeClass("is-active is-in").removeAttr("aria-live").hide(),d.addClass("is-active is-in").attr("aria-live","polite").show(),this.options.autoPlay&&this.timer.restart()),this.$element.trigger("slidechange.zf.orbit",[d]))},i.prototype._updateBullets=function(t){var i=this.$element.find("."+this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),e=i.find("span:last").detach(),s=this.$bullets.eq(t).addClass("is-active").append(e)},i.prototype.destroy=function(){delete this.timer,this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(),t.unregisterPlugin(this)},t.plugin(i,"Orbit")}(jQuery,window.Foundation);