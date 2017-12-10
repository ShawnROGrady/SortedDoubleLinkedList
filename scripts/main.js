/*
  Code by Shawn O'Grady
  This file is responsible for taking the user input
  +The goal is to allow the user to perform all the following through forms on a webpage:
    1. insert a value
    2. remove a value
    3. print the entire list (either forwards or backwards)
    4. search the list for a specific value
    5. close the program
  +Currently I can perform the following via webpage forms:
    -have the user chose which function to perform
    -insert a value to the list
    -remove a value from the list
  +The following are still done via alert() pop ups
    -print the List
    -searfh the list
*/
//using strict mode for safety
"use strict";
import {sortedDLL} from "./sortedDLL.js";


var list= sortedDLL();  //the sorted doubly linked list

var startButton = document.getElementById('start');
var choiceButton=document.getElementById('enter');
var insertButton=document.getElementById("insertEnter");
var removeButton=document.getElementById("removeEnter");

startButton.onclick = function() {
  startButton.style.visibility="hidden";
  document.getElementById("frm1").style.visibility="visible";
}

choiceButton.onclick=function main(){
  var userInput;
  var x=document.getElementById("frm1");
  var choice=x.elements[0].value;
  alert(choice);
  document.getElementById("frm1").style.visibility="hidden";

  var userInput;
  if(choice==1){
    //insert value
    addHandler();
  }
  else if(choice==2){
    //remove a value
    removeHandler();
  }
  else if(choice==3){
    //print list
    var dir=prompt("which direction do you wish to print (\"forward\" or \"reverse\")?");
    list.changePrint(dir);
    list.print();
  }
  else if(choice==4){
    //search the list
    userInput=prompt("enter a value to search for");
    if(list.search(Number(userInput)).found){
      //value was in list
      alert(userInput+" is in the list");
    }else{
      //not in list
      alert(userInput+" is not in the list");
    }
  }
  else if(choice==5||choice==null){
    //close program
    alert("thank you for using this program");
  }
  else{
    //invalid choice
    alert("please enter a valid choice");

  }
}

function addHandler(){
  //alert("hello");
  document.getElementById("addNode").style.visibility="visible";
}
function removeHandler(){
  document.getElementById("removeNode").style.visibility="visible";
}

insertButton.onclick=function(){
  var insert=document.getElementById('addNode');
  var userInput=insert.elements[0].value;
  list.insert(Number(userInput));
  document.getElementById("addNode").style.visibility="hidden";  //hide add form
  document.getElementById("frm1").style.visibility="visible"; //make main form visible again
}

removeButton.onclick=function(){
  var remove=document.getElementById('removeNode');
  var userInput=remove.elements[0].value;
  list.remove(Number(userInput));
  document.getElementById("removeNode").style.visibility="hidden";  //hide remove form
  document.getElementById("frm1").style.visibility="visible"; //make main form visible again
}
