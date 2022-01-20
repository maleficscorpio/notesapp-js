console.log(chalk.white.bgBlue("Starting Notes ......"));


import chalk from 'chalk';
import yargs from 'yargs';
// import notes from './notes.js';
// const yargs = require('yargs');
// const notes = require('./notes.js');
const argv = yargs.argv;
var title = yargs.argv.title;
var body = yargs.argv.body;
var command = yargs.argv._[0];


switch (command){
case "add":
  console.log(chalk.yellow("adding note"));
  addingNote(title, body);
break;
case "remove":
  console.log(chalk.yellow("removing note"));
  removeNote(title);
break;
case "read":
  console.log(chalk.yellow("reading note"));
  readNote(title);
break;
case "list":
  console.log(chalk.yellow("listing all notes"));
  getAll();
break;


}


// } else {
//   console.log("Unknown command was used!");
// }



import fs from 'fs';
// const fs = require('fs');

function fetchNotes() {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch (err) {
    return [];
  }
}

function addingNote(title, body){
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var double = notes.filter((note) => note.title === title);
  if(double.length === 0){
    notes.push(note);

    fs.writeFileSync("notes.json", JSON.stringify(notes));

    logNote(note);
    console.log(chalk.bgGreen.white("Note Added Successfully"));
  } else {
    console.log(chalk.bgRed.white(chalk.bold("WARNING:") + "Title Already Exists."));
  }
}

function removeNote (title) {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var double = notes.filter((note) => note.title === title);
  if(double.length !== 0){
  var filteredNotes = notes.filter((note) => note.title !== title);
  fs.writeFileSync("notes.json", JSON.stringify(filteredNotes));
  console.log(chalk.bgGreen.white("Note Removed Successfully"));
  } else {
    console.log(chalk.bgRed.white(chalk.bold("WARNING:") + "Note Does Not Exists."));
  }
}

function readNote (title) {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  logNote(filteredNotes[0]);
}

function getAll (){
  var notes = fetchNotes();
  notes.forEach((note) => logNote(note));
}

function logNote (note)  {
  
  console.log(chalk.bgWhite.black(`${note.title}: ${note.body}\n`));
  
  
}




