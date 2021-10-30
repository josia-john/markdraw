var storedOffset = 0;
var storedParagraph = 0;

function getIndexOfNodeInNodelist(node) {
    var index = [];
    while (node.id != "editor") {
        index.push(Array.prototype.indexOf.call(node.parentNode.childNodes, node));     // find index on this level and push to index
        node = node.parentNode;                                                         // next level
    }
    index.reverse();

    return index;
}


function getCaretOffsetInParagraph() {
    var sel = document.getSelection();

    var index = getIndexOfNodeInNodelist(sel.focusNode);
    var offset = sel.focusOffset;                                                                       // create an offset which goes from the beginning.

    var indexRecreated = [index[0], 0];                                                                 // recreate index of node in nodelist to get offset in the whole paragraph

    var htmlOfCaretParagraph = String(document.getElementById("editor").childNodes[indexRecreated[0]].innerHTML);


    var moveToNextNode = 0;
    for (i = 0; i<htmlOfCaretParagraph.length; i++) {
        if (JSON.stringify(indexRecreated) == JSON.stringify(index)) break;                             // break loop if the desired node is reached
        if (htmlOfCaretParagraph[i] == "<") {
            if (htmlOfCaretParagraph[i+1] == "/") {                                                     // closing HTML-tag -> next sibling node
                indexRecreated.pop();
                while (htmlOfCaretParagraph[i] != ">") {
                    i++;
                }
                if (htmlOfCaretParagraph[i+1] != "<") {
                    indexRecreated[indexRecreated.length-1]++;
                }
            } else {                                                                                    // opening HTML-tag -> next siblin node if text was inbetween
                if (moveToNextNode) indexRecreated[indexRecreated.length-1]++;
                indexRecreated.push(0);
                while (htmlOfCaretParagraph[i] != ">") {
                    i++;
                }
                moveToNextNode = 0;
            }
        } else {                                                                                        // non HTML-tag -> increase offset
            offset++;
            moveToNextNode = 1;
        }
    }

    return [offset, index[0]];
}


function getNodeOfOffset(paragraph, offset) {
    var indexRecreated = [paragraph, 0];

    var offsetInNode = 0;
    var offsetRecreated = 0;
    var htmlOfCaretParagraph = String(document.getElementById("editor").childNodes[indexRecreated[0]].innerHTML);
    var doIt = 0;
    for (i = 0; i<htmlOfCaretParagraph.length; i++) {
        if (offsetRecreated == offset) break;
        if (htmlOfCaretParagraph[i] == "<") {
            offsetInNode = 0;                                                                           // new node -> reset offset in searched node
            if (htmlOfCaretParagraph[i+1] == "/") {                                                     // closing HTML-tag
                indexRecreated.pop();
                while (htmlOfCaretParagraph[i] != ">") {
                    i++;
                }
                if (htmlOfCaretParagraph[i+1] != "<") {
                    indexRecreated[indexRecreated.length-1]++;
                }
            } else {                                                                                    // opening HTML-tag
                if (doIt) indexRecreated[indexRecreated.length-1]++;
                indexRecreated.push(0);
                while (htmlOfCaretParagraph[i] != ">") {
                    i++;
                }
                doIt = 0;
            }
        } else {                                                                                        // normal text (no HTML-tag)
            offsetRecreated++;
            offsetInNode++;
            doIt = 1;
        }
    }
    return [indexRecreated, offsetInNode];
}


function getNodeByIndex(index) {
    var node = document.getElementById("editor");

    for (i = 0; i<index.length; i++) {
        children = Array.prototype.slice.call(node.childNodes);
        node = children[index[i]];
    }
    return node;
}


function storeCaret() {
    var res = getCaretOffsetInParagraph();
    storedOffset = res[0];
    storedParagraph = res[1];
}

function putCaretAt(paragraph, offset) {
    var selection = document.getSelection();

    var res = getNodeOfOffset(paragraph, offset);

    var index = res[0];
    var offsetInNode = res[1];

    selection.collapse(getNodeByIndex(index), offsetInNode);
}

function restoreCaret() {
    putCaretAt(storedParagraph, storedOffset);
}
