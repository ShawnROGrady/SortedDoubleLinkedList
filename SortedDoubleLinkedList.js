//Code By Shawn O'Grady

/*
+In trying to learn JS I am trying to implement some common data structures

+This is my attempt at a sorted doubly linked list
+Values in the queue will be of number type
  -just so sorting makes sense
+Each value may appear in the list up to two times
  -the duplicate value will be sorted as being greater than the original
    -for ex, list may be:
      1<-->2<-->3(original)<-->3(duplicate)<-->4<-->...
  -duplicate value will be removed from list before original

+End goal is to have user enter prompts (in main function) in order to perform the following functions:
  1. insert a value to the list
  2. remove a value from the list
  3. print the entire list (forward or reverse)
  4. search the list for a specified value
  5. close the program

+I currently believe I can:
  -insert values to the list
    -at beginning, middle, or end of the list
    -allow same value to appear in list up to twice
  -print values in forward direction
  -search for value
+Still need to add functionality for:
  -removing values from the list
  -printing list in reverse direction
  -taking user input
*/

//using strict mode for safety
"use strict";

//Node for doubly linked list:
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
function sortedDLL(){
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
    if(tail.value==null){
      //list is empty
      headInsert(newNode);
      tailInsert(newNode);
    }
    else if(input<head.value){
      //new head node
      headInsert(newNode);
    }
    else if(input>tail.value){
      //new tail node
      tailInsert(newNode);
    }
    else{
      //new middle node OR duplicate of tail node
      var search=doSearch(input);
      var safe=checkDuplicate(search.tmp, newNode, search.found);

      if(safe==true){
        console.log(input+" was inserted in to the list");
        if(search.tmp==tail){
          //adding duplicate of tail
          tailInsert(newNode);
        }else{
          //middle node
          middleInsert(newNode, search.tmp);
        }
      }else{
        console.log(input+" cannot be added to the list because it already appears twice");
      }
    }
  }
  //checks if value already has duplicate
  function checkDuplicate(tmp,newNode, inList){
    var canInsert=true;
    if(inList==true){
      //value we are adding is already in the list
      console.log(tmp.value+ " already in list");
      console.log(tmp.value+ " is duplicate? " + tmp.duplicate);
      if(tmp.duplicate==true){
        //there is already a duplicate of that value in the list
        //console.log(newNode.value+" cannot be added to the list because it already appears twice");
        console.log("not safe");
        canInsert=false;
      }else{
        newNode.setDuplicate(true);
        console.log("duplicate flag raised");
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


  //display function:
  function forwardPrint(){
    if(head.value!=null){
      //there are things in the list
      var listString="List contains(in order): \r";  //will hold entirety of list as single string for simple printing

      var tmp=head;
      listString=listString+tmp.value+" \r "; //add value to string

      //traverse list, adding values to string:
      while(tmp!=tail){
        tmp=tmp.nextNode;
        listString=listString+tmp.value+" \r "; //add value to string
      }
      console.log(listString);
    }else{
      //list is empty
      console.log("list is empty");
    }
  }

  var publicAPI={
    insert:doInsert,
    print:forwardPrint
  };
  return publicAPI;

}

//testing basic functionality:
var list=sortedDLL();
list.print(); //"list is empty"

list.insert(2);
list.print();

//testing to see if properly adds new tail nodes:
for(var i=6; i<10; i++){
  list.insert(i);
}
list.print(); //2, 6, 7, 8, 9

//testing to see if properly adds new head nodes:
list.insert(1);
list.insert(0);
list.print(); //0, 1, 2, 6, 7, 8, 9

//testing if properly adds new middle nodes
for(var i=3; i<6; i++){
  list.insert(i);
}
list.print(); //0, 1, 2, 3, ..., 9

//testing if properly adds duplicates of head+tail+middle nodes
list.insert(0);
list.insert(5);
list.insert(9);
list.print(); //0, 0, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9

//testing to see if prevents double duplicates
for(var i=0; i<10; i++){
  list.insert(i); // will see message that 0, 5, and 9 cant be added
}
list.print(); //0, 0, 1, 1, 2, 2, ..., 9, 9
