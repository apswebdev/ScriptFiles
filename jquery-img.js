/* =====================================================
 * 	JavaScript Document
 * 	Image App
 *      this is not stand alone and it works with a specific elements 
 * 	By: Anwar Saludsong
 * 	Created: 1-2013
 * =====================================================
 */
 
jQuery(document).ready(function(){

/* ================================================================
 * 	canvas declaration
 * ================================================================*/

			var canvas = new fabric.Canvas('actual_canvas');	
			var temp_canvas = new fabric.Canvas('temp_canvas');		
	
/* ================================================================
 * 	mockup process
 * ================================================================*/

			var mock = new mockupify();
		
			mock.first();
			  
			jQuery(".m_cont").click(function(){
					mock.mselect(jQuery(this));
			}); 
			jQuery(".mockup").click(function(){
					mock.mtoggle(jQuery(this));
			});      


/* ================================================================
 * 	background process
 * ================================================================*/

			var back = new backitup(canvas, temp_canvas);
		
			jQuery(".b").click(function(){
					back.bselect(jQuery(this));
			}); 


/* ================================================================
 *  Uploading Images Process
 * ================================================================*/

		 	var up = new uploaders(canvas);
			 
			var upload_image = document.getElementById('imageLoader1');
			upload_image.addEventListener('change', up.upload_image, false);
			
			var upload_background = document.getElementById('imageLoader2');
			upload_background.addEventListener('change', up.upload_background, false);
			 
			jQuery("#up_image").click(function(){
				jQuery("#imageLoader1").click();
			});
		
			jQuery("#up_background").click(function(){
				jQuery("#imageLoader2").click();
			});

/* ================================================================
 *  texters choice Process
 * ================================================================*/

		 	var txt = new texterschoice(canvas);
			 
			canvas.on('mouse:down', function(options) {
                        txt.sel_text(options);
			});
			
			jQuery('#add_text').click(function(){
				  txt.add_text();	
			});
			
			jQuery('#text_input').bind('keyup change',function(){
				  txt.change_text(jQuery(this));
			});
	
			jQuery('#text_font').change(function(){
		          txt.change_font(jQuery(this));
			});
			
			jQuery('#text_color').minicolors({
				letterCase:'uppercase',
				change: function(hex, rgb) {
						jQuery(".minicolors-swatch").find('SPAN').css({
							backgroundColor: hex
						});
					var activeObject = canvas.getActiveObject();
					if(activeObject !== null && activeObject.type == "text"){
						activeObject.setColor(hex);
						canvas.renderAll();
						jQuery(this).data('activeObject',activeObject);
						jQuery(this).data('modified',true);
		
					}
					canvas.renderAll();
				}
			});	
			
			jQuery("#done").click(function(){
				jQuery("#set_text").hide();
			});

/* ================================================================
 *  Events Process
 * ================================================================*/
        
			var evts = new eventproc(canvas, temp_canvas);
		
			jQuery(document).keyup(function(e){
				evts.del_item(e);
			}); 	
		
			jQuery(document).scroll(function(){	
				//evts.animatescroll();
			});

			jQuery("#reset").click(function(){
				evts.reset_canvas();
			});
			
			jQuery(".mkup").mCustomScrollbar({
					horizontalScroll:true
			});
		


/* ================================================================
 *  Downloading Process
 * ================================================================*/
        
			var down = new downloading(canvas, temp_canvas, this);
		
			jQuery("#download").click(function(e){
				down.download(e);
			}); 	


});


/* ================================================================
 *  google Fonts
 * ================================================================*/
	google.load('webfont','1');
	google.setOnLoadCallback(function() {
			WebFont.load({google: {families: ['Tangerine','Cantarell','Reenie Beanie','Lobster','Finger Paint',
				'Emblema One','Carrois Gothic SC','Eater','Griffy','Ruge Boogie','Nosifer']}});
	});
	
	(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();

/* =====================================================
 * 	mockupify Object
 *  this object handles the selection process 
 *  for mockup
 * =====================================================*/
function mockupify(){ 
         
		 var that = this;
		 
		 // set properties
		 this.first_elm = jQuery(".m_cont:first");
		 this.container = jQuery(".m_cont");
		 this.mock = jQuery(".mockup");
		 this.mk = jQuery("#mockup_cont");
		 
		 // set class
		 this.first = function(){
				this.first_elm.addClass("selected");
				that.mpass(jQuery('.m:eq(0)'));
				this.mock.removeAttr('checked');
				jQuery(".mockup:eq(0)").prop('checked', true);
		 }
		 
		 // set click for container
		 this.mselect = function(elm){
			   if(typeof elm == "undefined") return false;
			   this.container.removeClass("selected");
			   elm.addClass("selected");
			   that.mpass(elm.find('.m').eq(0));
			   jQuery(".mockup:eq(0)").prop('checked', true);
		 }
		
		 // toggle for container
		 this.mtoggle = function(cont){	
				if(typeof cont == "undefined") return false;
				if(cont.val() === "1"){	
					this.first_elm.click();
				} else {
					this.container.removeClass("selected");
					that.mremove();
				}
		 }
		 
		 // pass selected value for processing
		 this.mpass = function(elm){
			    if(typeof elm == "undefined") return false;
				jQuery("#bk_img").val(elm.attr('src'));
				jQuery("#bk_mode").val(elm.attr('alt'));
		 }
		 // remove selected value for processing
		 this.mremove = function(){	
				jQuery("#bk_img").val('');
				jQuery("#bk_mode").val('');
		 }
 
}/* -- -- END of mockuperfy -- -- */

/* =====================================================
 * 	backitup Object
 *  this object handles the selection process 
 *  for backgrounds
 * =====================================================*/
function backitup(canvas, temp_canvas){ 
         
		 if(typeof canvas == "undefined") return false;
		 if(typeof temp_canvas == "undefined") return false;
		  
		 // set properties
		 this.elm = jQuery(".b");
		 
		 
		 // set click for background
		 this.bselect = function(elm){	
			   jQuery(".b").removeClass("selected");
			   elm.addClass("selected");
			   this.insert_in_canvas(elm.attr('src'));
		 }
		
		 this.insert_in_canvas = function(img){
		 	   canvas.backgroundImageStretch = true;
			   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
			   jQuery("#has_image").val(1);
		 }
 
}/* -- -- END of backitup -- -- */

/* =====================================================
 * 	texterschoice Object
 *  this object handles the text processing
 *  to edit in canvas
 * =====================================================*/
function texterschoice(canvas){ 
 
		// set properties
   	    if(typeof canvas == "undefined") return false;
		
		this.sel_text = function(options) {
  			if (options.target) {
				canvas.bringToFront(options.target);
    			if (options.target.type == "text") {
					jQuery("#text_input").val(options.target.text);
					jQuery('#text_font').val(options.target.fontFamily);
					jQuery('#text_color').val(options.target.getFill().toUpperCase());
					jQuery(".minicolors-swatch").find('SPAN').css({
							backgroundColor: options.target.getFill().toUpperCase()
					});
					jQuery("#set_text").show();	
				} 
  			} else {
				jQuery("#set_text").hide();	
			}
		}
		
		this.add_text = function() {
				var textSample = new fabric.Text("Click this to edit.",{
				fontFamily: "Impact",
				left: 425,
				top: 270,
				fontSize: 60,
				textAlign: "center",
				fill:"#FFFFFF",
				textShadow: 'rgba(0,0,0,0.2) 2px 2px 10px',
				});
				canvas.add(textSample);
				canvas.renderAll();
		}
		
		this.change_text = function(elm){
				var activeObject = canvas.getActiveObject();
				if(activeObject !== null  && activeObject.type == "text"){
					var text = elm.val();
					activeObject.setText(text);
					canvas.renderAll();
				}
		}
		
		this.change_font = function(elm){
				var activeObject = canvas.getActiveObject();
				if(activeObject !== null && activeObject.type == "text"){
					var font = elm.val();
					activeObject.set({fontFamily:font});
					canvas.renderAll();
				}
		}
		 
 
}/* -- -- END of texterschoice -- -- */

/* =====================================================
 * 	uploaders Object
 *  this object handles the uploading 
 *  for images as backgrounds or images on canvas
 * =====================================================*/
function uploaders(canvas){ 
 
		// set properties
   	    if(typeof canvas == "undefined") return false;

        // image upload in canvas
		this.upload_image = function(e){
			var reader = new FileReader();
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
                 		var im_ = new fabric.Image(img, {scaleX:.5, scaleY:.5});
						jQuery("#has_image").val(1);
						canvas.add(im_);
						im_.setActive(true);
						canvas.centerObjectH(im_).centerObjectV(im_);
						im_.setCoords();
						canvas.renderAll();
				}
				img.src = event.target.result;
			}
			reader.readAsDataURL(e.target.files[0]);     
		}	
        
		// background upload
		this.upload_background = function(e){
			var reader = new FileReader();
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
					canvas.backgroundImageStretch = true;
        			canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas));
				}
				img.src = event.target.result;
			}
			reader.readAsDataURL(e.target.files[0]);     
		}			 
 
}/* -- -- END of uploaders -- -- */

/* =====================================================
 * 	eventproc Object
 *  this object handles the event 
 *  for delete item and scroll
 * =====================================================*/
function eventproc(canvas, temp_canvas){ 

		// set properties
   	    if(typeof canvas == "undefined") return false;
   	    if(typeof temp_canvas == "undefined") return false;
		 
		// delete selected object
		this.del_item = function(e){
					if(e.keyCode == 46){
						var activeObject = canvas.getActiveObject();
						if(activeObject){
							canvas.remove(activeObject);
						}
					}
		} 	
		
		// animate scrolling / canvas options
		this.animatescroll = function(){
			window.pageYOffset	
			if (window.pageYOffset > 450) {
		 //	if (jQuery('html,body').scrollTop() > 450) {
				jQuery("#canvas_opt").stop()
				.animate({"marginTop":  "350px"}, "1000" );			
			} else {
				jQuery("#canvas_opt").stop()
				.animate({"marginTop": "0px"}, "1000" );			
			}
		}	 

		this.reset_canvas = function(){
			this.reset_all();	
			window.location.href=window.location.href;
			//window.location.href='http://mockupshot.com';

		}
		
		this.reset_all = function(){
			canvas.clear();
			canvas.setBackgroundImage('');
			canvas.renderAll();
			temp_canvas.clear();
			temp_canvas.setBackgroundImage('');
			temp_canvas.renderAll();
			jQuery("#bk_img").val('');
			jQuery("#bk_mode").val('');
			jQuery("#has_image").val('');
		}
 
}/* -- -- END of eventproc -- -- */

/* =====================================================
 * 	eventproc Object
 *  this object handles the event 
 *  for delete item and scroll
 * =====================================================*/
function downloading(canvas, temp_canvas){ 
        
		var that = this;
		
		// set properties
   	    if(typeof canvas == "undefined") return false;
		if(typeof temp_canvas == "undefined") return false;
		
		/*
		 *  generate
		 *	image to png
		 */
		this.download = function(e) { 

		        if(jQuery("#has_image").val()){
					
						jQuery("#actual_canvas").hide();
						jQuery("#select_background").hide();
						
						e.preventDefault(); 
						
						if(jQuery("#bk_mode").val()!="") {
							
							that.set_clipping(parseInt(jQuery("#bk_mode").val()));
							var imgs = new Image();
							imgs.onload = function(){
											
									var im_g = new fabric.Image(imgs, {});
									canvas.clear();
									canvas.setBackgroundImage('');
									im_g.setActive(false);
									im_g.hasBorders = false;
									im_g.hasControls = false;
									canvas.add(im_g);
									canvas.renderAll();
									that.render_final(imgs);
									
							}
							imgs.src = canvas.toDataURL('image/png');
						
						} else {
							
							jQuery.ajax({
										type: "POST",
										url: 'encode_file.php',
										dataType: "html",
										data: { data : canvas.toDataURL('image/png') },
		
										beforeSend: function(){
											jQuery("#loader").show();
										},
										
										timeout: 600000,
										
										success: function(file) {
											jQuery(".dis").prop('disabled', true);
											jQuery("#loader").hide();
											window.location.href =  "download.php?path="+ file;
										}
			
							});
						}
						
				} else {
					alert("There are no image to download!");
				}
		}

   
		/*
		 *  render_final
		 *  @param : image data
		 */
		this.render_final = function(imgs){
								
					var img_prev = new fabric.Image(imgs, {});
					
					var position = that.mode_bk(parseInt(jQuery("#bk_mode").val()));
					
					// render var because matrix does not accept "[]";
					var skx = position['skw_X'];
					var sky = position['skw_Y'];
					var scx = position['X_axis'];
					var scy = position['Y_axis'];
					
					img_prev.set({ left: position['left'], top: position['top'], 
					scaleX: position['scaleX'], scaleY: position['scaleY'],
					transformMatrix: [1, sky, skx, .5, scx, scy, .5]});
					//1, 0, 0.6, 1, 250, 0)
					//1, sky, skx, .5, scx, scy
					temp_canvas.add(img_prev); 
					temp_canvas.renderAll();
						
					// set background
					var bk_img = new Image();
					bk_img.src = jQuery("#bk_img").val();
					var im_gbk = new fabric.Image(bk_img, {});
					im_gbk.setActive(false);
					temp_canvas.add(im_gbk);
					temp_canvas.centerObjectH(im_gbk).centerObjectV(im_gbk);
					temp_canvas.selection = false;
					img_prev.set('selectable',false);
					im_gbk.set('selectable',false);
					temp_canvas.renderAll();
									
					/*
					 *  force download file
					 *	on success
					 */
					jQuery.ajax({
								type: "POST",
								url: 'encode_file.php',
								dataType: "html",
								data: { data : temp_canvas.toDataURL('image/png') },
								
								beforeSend: function(){
									jQuery("#loader").show();
								},
								
								success: function(file) {
									jQuery(".dis").prop('disabled', true);
									jQuery("#loader").hide();
									window.location.href =  "download.php?path="+ file;
								},
                                                                
                                                                error:function (xhr, ajaxOptions, thrownError){
								if(xhr.status==404) {
										alert(thrownError);
									}
								}
	
					});
		}   
		

	    /*
		 *  clip canvas
		 */			
		this.set_clipping = function(mode){
			var ctx = canvas.getContext("2d");
			var m = that.mode_bk(mode);
			canvas.clipTo = function (ctx) {
				ctx.beginPath();
				ctx.moveTo(m['sx'],m['sy']);
				ctx.lineTo(m['sx1'],m['sy1']);
				ctx.lineTo(m['sx2'],m['sy2']);
				ctx.lineTo(m['sx3'],m['sy3']);
				ctx.closePath();
					
			};
			canvas.renderAll();
		}

		/*
		 *  remove clip on canvas
		 */		
		this.remove_clipping = function(){
			var ctx = canvas.getContext("2d");
			canvas.clipTo = function (ctx) {
				ctx.moveTo(0,0);
				ctx.lineTo(820,0);
				ctx.lineTo(820,750);
				ctx.lineTo(0,750);
				ctx.closePath();
			};
			canvas.renderAll();
		}

	    /*
		 *  MODE Settings
		 */		
		this.mode_bk = function(idx){
			var mode_pos = new Array();
			mode_pos[1] = new Array();
			mode_pos[1]['left'] = 395;
			mode_pos[1]['top'] = 630;
			mode_pos[1]['angle'] = 1;
			mode_pos[1]['scaleY'] = .85;
			mode_pos[1]['scaleX'] = .65;
			mode_pos[1]['skw_X'] = 0;
                        mode_pos[1]['skw_Y'] = 0;
                        mode_pos[1]['X_axis'] = 12;
                        mode_pos[1]['Y_axis'] = 2;
			mode_pos[1]['sx'] = 0;
			mode_pos[1]['sy'] = 0;
                        mode_pos[1]['sx1'] = 800; mode_pos[1]['sy1'] = 0;
                        mode_pos[1]['sx2'] = 800; mode_pos[1]['sy2'] = 750;
			mode_pos[1]['sx3'] = 0; mode_pos[1]['sy3'] = 750;			

			mode_pos[2] = new Array();
			mode_pos[2]['left'] = 387;
			mode_pos[2]['top'] = 559;
			mode_pos[2]['angle'] = 1;
			mode_pos[2]['scaleY'] = .90;
			mode_pos[2]['scaleX'] = .59;
			mode_pos[2]['skw_X'] = .05;
                        mode_pos[2]['skw_Y'] = .10;
                        mode_pos[2]['X_axis'] = 12;
                        mode_pos[2]['Y_axis'] = 2;
			mode_pos[2]['sx'] = 0;
			mode_pos[2]['sy'] = 0;
                        mode_pos[2]['sx1'] = 800; mode_pos[2]['sy1'] = 70;
                        mode_pos[2]['sx2'] = 800; mode_pos[2]['sy2'] = 700;
			mode_pos[2]['sx3'] = 0; mode_pos[2]['sy3'] = 750;			

			mode_pos[3] = new Array();
			mode_pos[3]['left'] = 417;
			mode_pos[3]['top'] = 738;
			mode_pos[3]['angle'] = 1;
			mode_pos[3]['scaleY'] = .95;
			mode_pos[3]['scaleX'] = .59;
			mode_pos[3]['skw_X'] = -.03;
                        mode_pos[3]['skw_Y'] = -.07;
                        mode_pos[3]['X_axis'] = 12;
                        mode_pos[3]['Y_axis'] = 2;
			mode_pos[3]['sx'] = 0; mode_pos[3]['sy'] = 70;
                        mode_pos[3]['sx1'] = 820; mode_pos[3]['sy1'] = 0;
                        mode_pos[3]['sx2'] = 820; mode_pos[3]['sy2'] = 750;
			mode_pos[3]['sx3'] = 0; mode_pos[3]['sy3'] = 720;	
            
			mode_pos[4] = new Array();
			mode_pos[4]['left'] = 407;
			mode_pos[4]['top'] = 837;
			mode_pos[4]['angle'] = 1;
			mode_pos[4]['scaleY'] = .76;
			mode_pos[4]['scaleX'] = .59;
			mode_pos[4]['skw_X'] = 0;
                        mode_pos[4]['skw_Y'] = 0;
                        mode_pos[4]['X_axis'] = 12;
                        mode_pos[4]['Y_axis'] = 2;
			mode_pos[4]['sx'] = 0;
			mode_pos[4]['sy'] = 0;
                        mode_pos[4]['sx1'] = 800; mode_pos[4]['sy1'] = 0;
                        mode_pos[4]['sx2'] = 800; mode_pos[4]['sy2'] = 750;
			mode_pos[4]['sx3'] = 0; mode_pos[4]['sy3'] = 750;	

			mode_pos[5] = new Array();
			mode_pos[5]['left'] = 198;
			mode_pos[5]['top'] = 710;
			mode_pos[5]['angle'] = 0;
			mode_pos[5]['scaleY'] = .99;
			mode_pos[5]['scaleX'] = .38;
			mode_pos[5]['skw_X'] = 0;
                        mode_pos[5]['skw_Y'] = 0;
                        mode_pos[5]['X_axis'] = 12;
                        mode_pos[5]['Y_axis'] = 2;
			mode_pos[5]['sx'] = 0;
			mode_pos[5]['sy'] = 0;
                        mode_pos[5]['sx1'] = 800; mode_pos[5]['sy1'] = 0;
                        mode_pos[5]['sx2'] = 800; mode_pos[5]['sy2'] = 750;
			mode_pos[5]['sx3'] = 0; mode_pos[5]['sy3'] = 750;		

			mode_pos[6] = new Array();
			mode_pos[6]['left'] = 565;
			mode_pos[6]['top'] = 900;
			mode_pos[6]['angle'] = 0;
			mode_pos[6]['scaleY'] = .72;
			mode_pos[6]['scaleX'] = .25;
			mode_pos[6]['skw_X'] = -0.02;
                        mode_pos[6]['skw_Y'] = -0.05;
                        mode_pos[6]['X_axis'] = 12;
                        mode_pos[6]['Y_axis'] = 2;
			mode_pos[6]['sx'] = 0;
			mode_pos[6]['sy'] = 25;
                        mode_pos[6]['sx1'] = 820; mode_pos[6]['sy1'] = 0;
                        mode_pos[6]['sx2'] = 820; mode_pos[6]['sy2'] = 750;
			mode_pos[6]['sx3'] = 0; mode_pos[6]['sy3'] = 730;					  
		    
                	return mode_pos[idx];
		}			
		
}/* -- -- END of downloading -- -- */
