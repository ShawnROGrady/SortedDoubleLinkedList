# SortedDoubleLinkedList
Implementation of sorted doubly-linked list in JavaScript

I am just starting to learn JavaScript and figured a good way to familarize myself with the new language was to make something similar to what I have made in the past with C++ (language I have the most experience with)

The main complexity comes from the fact that nodes can be inserted and removed from anywhere in the list (unlike a stack or queue).

For the sake of simplicity, I am only considering the case where all items in the list are of **number** type. 

Additionally, I plan on allowing each value to appear in the list up to two times. I figured that it would be good practice to write a program that required setting/checking a "duplicate" flag.

My end goal is to implement a doubly linked list that takes user input to perform the following five functions:

1. insert a value
2. remove a value
3. print the entire list (either forwards or backwards)
4. search the list for a specific value
5. close the program

Along with this README file, this repository contains:
  1. an html file to run JavaScript files and provide forms to take user input
  2. a folder named scripts which contains the following JavaScript files:
    * sortedDLL.js which contains the implementation of the sorted doubly linked list data structure
    * main.js which handles all user input
    * SortedDoubleLinkedList.js which is not actually used, but can be easily copy/pasted to the console for testing
 
This program is intended for personal education, and I plan on updating it as I learn more 

I have been testing this program in **Google Chrome(Version 63.0.3239.84)** using a local testing server. Local server was set up using Python's SimpleHTTPServer module. This program makes use of module features added in ES6, so it may not run in older browsers.
