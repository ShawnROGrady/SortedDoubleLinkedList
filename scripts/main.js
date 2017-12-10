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
    -search the list for a specifc value
    -print the List
  +Still need to:
    -clean up the interface
    -reduce # of alerts:
      -i.e. when printing the list actually print the list to the webpage
*/
//using strict mode for safety
"use strict";
import {sortedDLL} from "./sortedDLL.js";


var list= sortedDLL();  //the sorted doubly linked list

var startButton = document.getElementById('start');
var choiceButton=document.getElementById('enter');
var insertButton=document.getElementById("insertEnter");
var removeButton=document.getElementById("removeEnter");
var searchButton=document.getElementById("searchEnter");
var printButton=document.getElementById("printEnter");

startButton.onclick = function() {
  startButton.style.visibility="hidden";
  document.getElementById("frm1").style.visibility="visible";
}

choiceButton.onclick=function main(){
  var userInput;
  var x=document.getElementById("frm1");
  var choice=x.elements[0].value;
  //alert(choice);
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
    printHandler();
  }
  else if(choice==4){
    //search the list
    searchHandler();
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
function searchHandler(){
  document.getElementById("searchNode").style.visibility="visible";
}
function printHandler(){
  document.getElementById("printList").style.visibility="visible";
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

searchButton.onclick=function(){
  var search=document.getElementById('searchNode');
  var userInput=search.elements[0].value;
  if(list.search(Number(userInput)).found){
    //value was in list
    alert(userInput+" is in the list");
  }else{
    //not in list
    alert(userInput+" is not in the list");
  }
  document.getElementById("searchNode").style.visibility="hidden";  //hide search form
  document.getElementById("frm1").style.visibility="visible"; //make main form visible again
}

printButton.onclick=function(){
  var print=document.getElementById('printList');
  if(print.elements[0].checked){
    //forward button pressed
    list.changePrint("forward");
    list.print();
  }
  else if(print.elements[1].checked){
    //reverse button pressed
    list.changePrint("reverse");
    list.print();
  }
  else{
    //user did not press either button
    alert("please select a direction");
  }
  document.getElementById("printList").style.visibility="hidden";  //hide print form
  document.getElementById("frm1").style.visibility="visible"; //make main form visible again
}
