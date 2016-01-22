!function(e,$){"use strict";function t(i,o){this.$element=i,this.options=$.extend({},t.defaults,this.$element.data(),o),this._init(),e.registerPlugin(this,"Reveal"),e.Keyboard.register("Reveal",{ENTER:"open",SPACE:"open",ESCAPE:"close",TAB:"tab_forward",SHIFT_TAB:"tab_backward"})}t.defaults={animationIn:"",animationOut:"",showDelay:0,hideDelay:0,closeOnClick:!0,closeOnEsc:!0,multipleOpened:!1,vOffset:100,hOffset:0,fullScreen:!1,btmOffsetPct:10,overlay:!0,resetOnClose:!1},t.prototype._init=function(){if(this.id=this.$element.attr("id"),this.isActive=!1,this.$anchor=$($('[data-open="'+this.id+'"]').length?'[data-open="'+this.id+'"]':'[data-toggle="'+this.id+'"]'),this.$anchor.length){var t=this.$anchor[0].id||e.GetYoDigits(6,"reveal");this.$anchor.attr({"aria-controls":this.id,id:t,"aria-haspopup":!0,tabindex:0}),this.$element.attr({"aria-labelledby":t})}(this.options.fullScreen||this.$element.hasClass("full"))&&(this.options.fullScreen=!0,this.options.overlay=!1),this.options.overlay&&!this.$overlay&&(this.$overlay=this._makeOverlay(this.id)),this.$element.attr({role:"dialog","aria-hidden":!0,"data-yeti-box":this.id,"data-resize":this.id}),this._events()},t.prototype._makeOverlay=function(e){var t=$("<div></div>").addClass("reveal-overlay").attr({tabindex:-1,"aria-hidden":!0}).appendTo("body");return this.options.closeOnClick&&t.attr({"data-close":e}),t},t.prototype._events=function(){var e=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":function(){e.$element.is(":visible")&&e._setPosition(function(){})}}),this.$anchor.length&&this.$anchor.on("keydown.zf.reveal",function(t){(13===t.which||32===t.which)&&(t.stopPropagation(),t.preventDefault(),e.open())}),this.options.closeOnClick&&this.options.overlay&&this.$overlay.off(".zf.reveal").on("click.zf.reveal",this.close.bind(this))},t.prototype._setPosition=function(t){var i=e.Box.GetDimensions(this.$element),o=this.options.fullScreen?"reveal full":i.height>=.5*i.windowDims.height?"reveal":"center";"reveal full"===o?this.$element.offset(e.Box.GetOffsets(this.$element,null,o,this.options.vOffset)).css({height:i.windowDims.height,width:i.windowDims.width}):e.MediaQuery.atLeast("medium")&&e.Box.ImNotTouchingYou(this.$element,null,!0,!1)?this.$element.css({"max-height":i.windowDims.height-this.options.vOffset*(this.options.btmOffsetPct/100+1),width:""}).offset(e.Box.GetOffsets(this.$element,null,o,this.options.vOffset)):(this.$element.css({width:i.windowDims.width-2*this.options.hOffset}).offset(e.Box.GetOffsets(this.$element,null,"center",this.options.vOffset,this.options.hOffset)),this.changedSize=!0),t()},t.prototype.open=function(){var t=this;this.isActive=!0,this.$element.css({visibility:"hidden"}).show().scrollTop(0),this._setPosition(function(){t.$element.hide().css({visibility:""}),t.options.multipleOpened||t.$element.trigger("closeme.zf.reveal",t.id),t.options.animationIn?t.options.overlay?e.Motion.animateIn(t.$overlay,"fade-in",function(){e.Motion.animateIn(t.$element,t.options.animationIn,function(){t.focusableElements=e.Keyboard.findFocusable(t.$element)})}):e.Motion.animateIn(t.$element,t.options.animationIn,function(){t.focusableElements=e.Keyboard.findFocusable(t.$element)}):t.options.overlay?t.$overlay.show(0,function(){t.$element.show(t.options.showDelay,function(){})}):t.$element.show(t.options.showDelay,function(){})}),this.$element.attr({"aria-hidden":!1}).attr("tabindex",-1).focus().trigger("open.zf.reveal"),$("body").addClass("is-reveal-open").attr({"aria-hidden":this.options.overlay||this.options.fullScreen?!0:!1}),setTimeout(function(){t._extraHandlers()},0)},t.prototype._extraHandlers=function(){var t=this;this.focusableElements=e.Keyboard.findFocusable(this.$element),this.options.overlay||!this.options.closeOnClick||this.options.fullScreen||$("body").on("click.zf.reveal",function(e){t.close()}),this.options.closeOnEsc&&$(window).on("keydown.zf.reveal",function(i){e.Keyboard.handleKey(i,"Reveal",{close:function(){t.options.closeOnEsc&&(t.close(),t.$anchor.focus())}}),0===t.focusableElements.length&&i.preventDefault()}),this.$element.on("keydown.zf.reveal",function(i){var o=$(this);e.Keyboard.handleKey(i,"Reveal",{tab_forward:function(){t.$element.find(":focus").is(t.focusableElements.eq(-1))&&(t.focusableElements.eq(0).focus(),i.preventDefault())},tab_backward:function(){(t.$element.find(":focus").is(t.focusableElements.eq(0))||t.$element.is(":focus"))&&(t.focusableElements.eq(-1).focus(),i.preventDefault())},open:function(){t.$element.find(":focus").is(t.$element.find("[data-close]"))?setTimeout(function(){t.$anchor.focus()},1):o.is(t.focusableElements)&&t.open()},close:function(){t.options.closeOnEsc&&(t.close(),t.$anchor.focus())}})})},t.prototype.close=function(){if(!this.isActive||!this.$element.is(":visible"))return!1;var t=this;this.options.animationOut?e.Motion.animateOut(this.$element,this.options.animationOut,function(){t.options.overlay&&e.Motion.animateOut(t.$overlay,"fade-out",function(){})}):this.$element.hide(t.options.hideDelay,function(){t.options.overlay&&t.$overlay.hide(0,function(){})}),this.options.closeOnEsc&&$(window).off("keydown.zf.reveal"),!this.options.overlay&&this.options.closeOnClick&&$("body").off("click.zf.reveal"),this.$element.off("keydown.zf.reveal"),this.changedSize&&this.$element.css({height:"",width:""}),$("body").removeClass("is-reveal-open").attr({"aria-hidden":!1,tabindex:""}),this.options.resetOnClose&&this.$element.html(this.$element.html()),this.isActive=!1,this.$element.attr({"aria-hidden":!0}).trigger("closed.zf.reveal")},t.prototype.toggle=function(){this.isActive?this.close():this.open()},t.prototype.destroy=function(){this.options.overlay&&this.$overlay.hide().off().remove(),this.$element.hide(),this.$anchor.off(),e.unregisterPlugin(this)},e.plugin(t,"Reveal"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=t),"function"==typeof define&&define(["foundation"],function(){return t})}(Foundation,jQuery);