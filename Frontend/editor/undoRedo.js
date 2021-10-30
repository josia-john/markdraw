    //array to store canvas objects history
    canvas_history=[];
    s_history=true;
    cur_history_index=0; 
    DEBUG=false;
    maxLenght=1000;

//store every modification of canvas in history array
function save_history(force){
    var cur_canvas=JSON.stringify(jQuery(editor).html());
    //if current state identical to previous don't save identical states
    if(canvas_history.length>0 ? cur_canvas!=canvas_history[cur_history_index][0] : 1 || force==1){
        //if we already used undo button and made modification - delete all forward history
        if(cur_history_index<canvas_history.length-1){
            canvas_history=canvas_history.slice(0,cur_history_index+1);
            cur_history_index++;
        }
        canvas_history.push([cur_canvas, storedParagraph, storedOffset]);
        cur_history_index=canvas_history.length-1;
    }

    if (canvas_history.length > maxLenght) {
        canvas_history = canvas_history.slice(canvas_history.length-maxLenght);
    }
    
    DEBUG && console.log('saved '+canvas_history.length+" "+cur_history_index);
}


function history_undo(){
    if(cur_history_index>0)
    {
        s_history=false;
        canv_data=JSON.parse(canvas_history[cur_history_index-1][0]);
        jQuery(editor).html(canv_data);
        putCaretAt(canvas_history[cur_history_index-1][1], canvas_history[cur_history_index-1][2])
        cur_history_index--;
        DEBUG && console.log('undo '+canvas_history.length+" "+cur_history_index);      
    }
}

function history_redo(){
    if(canvas_history[cur_history_index+1])
    {
        s_history=false;
        canv_data=JSON.parse(canvas_history[cur_history_index+1][0]);       
        jQuery(editor).html(canv_data);
        putCaretAt(canvas_history[cur_history_index+1][1], canvas_history[cur_history_index+1][2])
        cur_history_index++;
        DEBUG && console.log('redo '+canvas_history.length+" "+cur_history_index); 
    }
}
jQuery('body').keydown(function(e){
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 89 || (e.keyCode === 90 && e.shiftKey))) {
        history_redo();
    }
    else if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
        history_undo();
    }

    else {
        save_history(0);
    }
});
