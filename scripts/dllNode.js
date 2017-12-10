//using strict mode for safety
//"use strict";

//Node for doubly linked list:
export function dllNode(){

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
