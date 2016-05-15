  $(function() {
    $('#sortable-long-boxes').sortable({
       items: '> :not(#healthchecks)'
       });
    $( "#sortable-long-boxes" ).disableSelection();
  });

  $(function() {
    $( "#sortable-small-boxes" ).sortable();
    $( "#sortable-small-boxes" ).disableSelection();
  });

$(function(){

$(window).bind("resize",function(){
    console.log($(this).width())
    if($(this).width() <500){
    $('div').removeClass('sortable-small-boxes').addClass('sortable-long-boxes')
    }
    else{
    $('div').removeClass('sortable-long-boxes').addClass('sortable-small-boxes')
    }
})
})