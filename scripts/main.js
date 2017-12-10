/*
  This file is responsible for taking the user input
*/
//using strict mode for safety
"use strict";
import {sortedDLL} from "./sortedDLL.js";


//main function:

var startButton = document.getElementById('start');
var choiceButton=document.getElementById('enter');
//choiceButton.style.visibility="none";

//var number=document.querySelector('form');
//number.style.visibility="none";

startButton.onclick = function() {
  startButton.style.visibility="hidden";
  document.getElementById("frm1").style.visibility="visible";
}

choiceButton.onclick=function(){
  var x=document.getElementById("frm1");
  var choice=x.elements[0].value
  alert(choice);
}

function main(){
  var list= sortedDLL();
  var choice=document.getElementById('form');
  alert(choice);
  var userInput;
  do{
    //choice=prompt("What would you like to do? \r 1. insert a value to the list \r 2. remove a value from the list \r 3. print the list \r 4. search the list \r 5. terminate program");
    if(choice==1){
      //insert value
      userInput=prompt("enter a value to add to the list");
      list.insert(Number(userInput));
    }
    else if(choice==2){
      //remove a value
      userInput=prompt("enter a value to remove from the list");
      list.remove(Number(userInput));
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
  }while(choice!=5 && choice!=null);
};
