//Code by Shawn O'Grady

function dllNode(){

  var value, prevNode, nextNode;
  var duplicate;  //=false;  //boolean value to indicate whether another node of the same value is already in the list

  function doSetValue(input){
    this.value=input;
  }

  function doSetNextNode(newNode){
    this.nextNode=newNode;
  }

  function doSetPrevNode(newNode){
    this.prevNode=newNode;
  }

  function doSetDuplicate(input){
    this.duplicate=input;
  }

  var NodeAPI={
    setValue:doSetValue,
    setNextNode:doSetNextNode,
    setPrevNode:doSetPrevNode,
    setDuplicate:doSetDuplicate
  };

  return NodeAPI;
}
//sorted dll
export function sortedDLL(){
  var head=dllNode();
  var tail=dllNode();
  var elements=0; //number of elements in list

  function doSearch(input){
    var found=false;
    var tmp=tail;
    if(head.value!=null){
      //things in list
      //traverse backwards:
      while(tmp!=head){
        if(tmp.value<=input){
          break;
        }
        tmp=tmp.prevNode;
      }
      //at this point, we could be at the head of the list, the value we searched for, or the node right before that value would be
      if(tmp.value==input){
        //found it
        found=true;
      }
    }
    var searchInfo={
      found:found,
      tmp:tmp
    }
    return searchInfo;
  }


  function doInsert(input){
    var newNode= dllNode();
    newNode.setValue(input);
    if(isNaN(input)){
      alert("list only accepts numerical values");
    }
    else{
      if(tail.value==null){
        //list is empty
        headInsert(newNode);
        tailInsert(newNode);
        alert(input+" was inserted in to the list");
      }
      else if(input<head.value){
        //new head node
        headInsert(newNode);
        alert(input+" was inserted in to the list");
      }
      else if(input>tail.value){
        //new tail node
        tailInsert(newNode);
        alert(input+" was inserted in to the list");
      }
      else{
        //new middle node OR duplicate of tail node
        var search=doSearch(input);
        var safe=checkDuplicate(search.tmp, newNode, search.found);

        if(safe==true){
          alert(input+" was inserted in to the list");
          if(search.tmp==tail){
            //adding duplicate of tail
            tailInsert(newNode);
          }else{
            //middle node
            middleInsert(newNode, search.tmp);
          }
        }else{
          alert(input+" cannot be added to the list because it already appears twice");
        }
      }
    }
  }
  //checks if value already has duplicate
  function checkDuplicate(tmp,newNode, inList){
    var canInsert=true;
    if(inList==true){
      //value we are adding is already in the list
      if(tmp.duplicate==true){
        //there is already a duplicate of that value in the list
        canInsert=false;
      }else{
        newNode.setDuplicate(true);
      }
    }else{
      //node.setDuplicate(false);
    }
    return canInsert;
  }

  function headInsert(newNode){
    newNode.setNextNode(head);
    head.setPrevNode(newNode);
    head=newNode;
  }

  function tailInsert(newNode){
    tail.setNextNode(newNode);
    newNode.setPrevNode(tail);
    tail=newNode;
  }

  function middleInsert(newNode, left){
    var right=left.nextNode;
    left.setNextNode(newNode);
    newNode.setPrevNode(left);
    right.setPrevNode(newNode);
    newNode.setNextNode(right);
  }

  function doRemove(input){
    if(head.value!=null){
      //things are in list
      var search=doSearch(input);
      if(search.found==true){
        //value is in the list
        var last=isLast();
        if(last==true){
          lastRemove();
        }else{
          if(search.tmp==head){
            //removing head node
            head=head.nextNode;
          }
          else if(search.tmp==tail){
            //removing tail node
            tail=tail.prevNode;
          }else{
            //middle node
            middleRemove(search.tmp);
          }
        }
        alert(input+" has been removed from the list");
      }else{
        alert(input+" is not in the list");
      }
    }else{
      alert("nothing in list, cannot remove an item");
    }
  }

  function middleRemove(node){
    node.prevNode.setNextNode(node.nextNode);
    node.nextNode.setPrevNode(node.prevNode);
  }

  function lastRemove(){
    //essentially reset the list
    head=dllNode();
    tail=dllNode();
  }

  //helper function which checks if there is more than one item in the list
  function isLast(){
    var last=false;
    if(head==tail){
      last=true;
    }
    return last;
  }


  //display function:
  function forwardPrint(){
    if(head.value!=null){
      //there are things in the list
      var forwardString="List contains(in order):<br>";  //will hold entirety of list as single string for simple printing

      var tmp=head;
      forwardString=forwardString+tmp.value+"<br>"; //add value to string

      //traverse list, adding values to string:
      while(tmp!=tail){
        tmp=tmp.nextNode;
        forwardString=forwardString+tmp.value+"<br>"; //add value to string
      }
      //alert(forwardString);
      return forwardString;
    }else{
      //list is empty
      return "list is empty";
    }
  }

  function printReverse(){
    if(tail.value!=null){
      //things in queue
      var reverseString="List contains(in reverse order):<br>";

      var tmp=tail;
      reverseString=reverseString+tmp.value+"<br>";

      while(tmp!=head){
        tmp=tmp.prevNode;
        reverseString=reverseString+tmp.value+"<br>";
      }
      //alert(reverseString);
      return reverseString;
    }else{
      return "list is empty";
    }
  }

  function changePrint(direction){
    if(direction=="forward"||direction=="f"||direction=="Forward"||direction=="F"){
      publicAPI.print=forwardPrint;
    }
    else if(direction=="reverse"||direction=="r"||direction=="Reverse"||direction=="R"){
      publicAPI.print=printReverse;
    }
    else{
      alert("invalid input");
    }

  }



  var publicAPI={
    insert:doInsert,
    print:forwardPrint,  //forward by default
    changePrint:changePrint,
    remove:doRemove,
    search:doSearch
  };
  return publicAPI;

}
