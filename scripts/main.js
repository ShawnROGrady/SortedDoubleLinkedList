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
*/
//using strict mode for safety
"use strict";
import {sortedDLL} from "./sortedDLL.js";


var list= sortedDLL();  //the sorted doubly linked list

//the various buttons:
var startButton = document.getElementById('start');
var choiceButton=document.getElementById('enter');
var insertButton=document.getElementById("insertEnter");
var removeButton=document.getElementById("removeEnter");
var searchButton=document.getElementById("searchEnter");
var printButton=document.getElementById("printEnter");
var hideButton=document.getElementById("hidePrint");

startButton.onclick = function() {
  startButton.style.display="none";
  document.querySelector('h2').style.display="none"; //hide initial instruction
  document.getElementById("welcome").style.display="none"; //hide program info
  document.querySelector('ol').style.display="none";
  document.getElementById("frm1").style.visibility="visible";
}

choiceButton.onclick=function main(){
  var x=document.getElementById("frm1");
  var choice=x.elements[0].value;
  //alert(choice);
  document.getElementById("frm1").style.display="none";

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
    terminateHandler();
  }
  else{
    //invalid choice
    /*
    I'm leaving this in here in case I decide to add more functionality
    currently this will never execute since "choice" is taken from input type number with min=1 max=5
    */
    alert("please enter a valid choice");
  }
}

function addHandler(){
  //alert("hello");
  document.getElementById("addNode").style.visibility="visible";
  document.getElementById("addNode").style.display="block";
}
function removeHandler(){
  document.getElementById("removeNode").style.visibility="visible";
  document.getElementById("removeNode").style.display="block";
}
function searchHandler(){
  document.getElementById("searchNode").style.visibility="visible";
  document.getElementById("searchNode").style.display="block";
}
function printHandler(){
  document.getElementById("printList").style.visibility="visible";
  document.getElementById("printList").style.display="block";
}
function terminateHandler(){
  //just display goodbye message
  document.getElementById("goodbye").style.visibility="visible";
  document.getElementById("goodbye").style.display="block";
}

insertButton.onclick=function(){
  var insert=document.getElementById('addNode');
  var userInput=insert.elements[0].value;
  list.insert(Number(userInput));
  document.getElementById("addNode").style.display="none";  //hide add form
  document.getElementById("frm1").style.display="block"; //make main form visible again
}

removeButton.onclick=function(){
  var remove=document.getElementById('removeNode');
  var userInput=remove.elements[0].value;
  list.remove(Number(userInput));
  document.getElementById("removeNode").style.display="none";  //hide remove form
  document.getElementById("frm1").style.display="block"; //make main form visible again
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
  document.getElementById("searchNode").style.display="none";  //hide search form
  document.getElementById("frm1").style.display="block"; //make main form visible again
}

printButton.onclick=function(){
  var print=document.getElementById('printList');
  var listContents; //this is a string, returned by the print function
  if(print.elements[0].checked){
    //forward button pressed
    document.getElementById("showList").style.display="block";
    list.changePrint("forward");
    listContents=list.print();
    document.getElementById("printedList").innerHTML=listContents;
  }
  else if(print.elements[1].checked){
    //reverse button pressed
    document.getElementById("showList").style.display="block";
    list.changePrint("reverse");
    listContents=list.print();
    document.getElementById("printedList").innerHTML=listContents;
  }
  else{
    //user did not press either button
    alert("please select a direction");
  }
  //document.getElementByID("printedList").style.display="none";
  document.getElementById("printList").style.display="none";  //hide print form
  //document.getElementById("frm1").style.display="block"; //make main form visible again
}

hideButton.onclick=function(){
  document.getElementById("showList").style.display="none";  //hide form shwing the list
  document.getElementById("frm1").style.display="block"; //make main form visible again
}
