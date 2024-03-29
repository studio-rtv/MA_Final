/* Load sounds */
var bell_sound = new Audio("sound/Bell.mp3");
var box_sound = new Audio("sound/Music\ Box\ Sound\ Effect.mp3");
var sea_sound = new Audio("sound/Sea\ Sound\ Effect.mp3");
var lock_sound = new Audio("sound/Lock.wav");
var knock_sound = new Audio("sound/Knock.wav");
var journal_sound = new Audio("sound/Book.wav");
var note_sound = new Audio("sound/Paper.wav");
var giggle_sound = new Audio("sound/Evil-Giggle.m4a");
var whisper_sound = new Audio("sound/Whispers.mp3");
var laugh_sound = new Audio("sound/Evil\ Laugh.mp3");
var creak_sound = new Audio("sound/Creaking_Door_or_Chest.wav");
var lightning_sound = new Audio("sound/Lightning.wav");
var bg_music = new Audio("sound/Music.mp3");
var sounds = [bell_sound, box_sound, sea_sound, whisper_sound, lock_sound, knock_sound,
              journal_sound, note_sound, giggle_sound, laugh_sound, lightning_sound, bg_music];
var brightness = 100;
var mute_flag = false;
var flag = false;

/* Meta Functions */
function load_page() {
  bg_music.loop = true;
  bg_music.play();
  random_events();
}

function random_events() {
  var events = [tap_window, whisper, laugh, lightning, creak];
  var time = Math.floor((Math.random() * 10000) + 20000); //random event every 20-30 secs
  var random_event = Math.floor(Math.random() * events.length);
  if(flag) {
    events[random_event]();
  }
  setTimeout(random_events, time);
  flag = true;
}

function mute() {
  var element = document.getElementById('mute');
  element.innerHTML = "<span class=\"glyphicon glyphicon-volume-off\" aria-hidden=\"true\"></span>";
  element.onclick = unmute;
  mute_flag = true;
  for(var x = 0; x < sounds.length; x++) {
    sounds[x].muted = true;
  }
}

function unmute() {
  var element = document.getElementById('mute');
  element.innerHTML = "<span class=\"glyphicon glyphicon-volume-up\" aria-hidden=\"true\"></span>";
  element.onclick = mute;
  mute_flag = false;
  for(var x = 0; x < sounds.length; x++) {
    sounds[x].muted = false;
  }
}

function brighten() {
  brightness = brightness + 10;
  b_command = "brightness(" + brightness.toString() + "%)";
  $('#main-panel').css('-webkit-filter', b_command);
  $('#main-panel').css('filter', b_command);
}

function darken() {
  brightness = brightness - 10;
  b_command = "brightness(" + brightness.toString() + "%)";
  $('#main-panel').css('-webkit-filter', b_command);
  $('#main-panel').css('filter', b_command);
}

/* Click Events */
function bell_start() {
  var element = document.getElementById("bell");
  element.setAttribute('src', 'anim/GIFs/bell.gif');
  if(!mute_flag)
    bell_sound.play();
  window.setTimeout(bell_stop, 6500);
}

function bell_stop() {
  var element = document.getElementById("bell");
  element.setAttribute('src', 'fg/bell.png');
}

function box_start() {
  if(!mute_flag) {
    bg_music.pause();
    box_sound.play();
  }
  var element = document.getElementById("box");
  element.setAttribute('src', 'anim/GIFs/music-box.gif');
  window.setTimeout(box_stop, 16500);
}

function box_stop() {
  if(!mute_flag) {
    box_sound.pause();
    box_sound.load();
    bg_music.play();
  }
  var element = document.getElementById("box");
  element.setAttribute('src', 'fg/music-box.png');
}

function journal_open() {
  if(!mute_flag)
    journal_sound.play();
  $('#notes-popup').fadeOut();
  $('#journal-popup').fadeIn();
}

function journal_close() {
  if(!mute_flag) {
    journal_sound.pause();
    journal_sound.load();
  }
  $('#journal-popup').fadeOut();
  var dipper_chance = Math.floor(Math.random() * 10);
  /* 1/10 chance of Dipper appearing */
  if(dipper_chance == 0)
    dipper_appear();
}

function lock_start() {
  if(!mute_flag)
    lock_sound.play();
  var element = document.getElementById("lock");
  element.setAttribute('src', 'anim/GIFs/lock.gif');
  window.setTimeout(lock_stop, 700);
}

function lock_stop() {
  if(!mute_flag) {
    lock_sound.pause();
    lock_sound.load();
  }
  var element = document.getElementById("lock");
  element.setAttribute('src', 'fg/lock.png');
}

function notes_open() {
  if(!mute_flag)
    note_sound.play();
  $('#journal-popup').fadeOut();
  $('#notes-popup').fadeIn();
  setTimeout(notes_blink, 10000);
}

function notes_close() {
  if(!mute_flag) {
    note_sound.pause();
    note_sound.load();
  }
  $('#notes-popup').fadeOut();
  var mabel_chance = Math.floor(Math.random() * 10);
  /* 1/10 chance of Mabel appearing */
  if(mabel_chance == 0)
    mabel_appear();
}

function notes_blink() {
  var element = document.getElementById("big_notes");
  element.setAttribute('src', 'anim/GIFs/notes.gif');
  setTimeout(notes_blink, 10000);
}

/* Hover Events */
function machine_hover(element) {
  if(!mute_flag)
    giggle_sound.play();
  element.setAttribute('src', 'anim/GIFs/machine.gif');
}

function machine_unhover(element) {
  if(!mute_flag) {
    giggle_sound.pause();
    giggle_sound.load();
  }
  element.setAttribute('src', 'fg/machine.png');
}

function painting_hover(element) {
  if(!mute_flag)
    sea_sound.play();
  element.setAttribute('src', 'anim/GIFs/painting.gif');
}

function painting_unhover(element) {
  if(!mute_flag) {
    sea_sound.pause();
    sea_sound.load();
  }
  element.setAttribute('src', 'fg/painting.png');
}

/* Random Events */
function creak() {
  if(!mute_flag)
    creak_sound.play();
  setTimeout(creak_stop, 5000);
}

function creak_stop() {
  if(!mute_flag) {
    creak_sound.pause();
    creak_sound.load();
  }
}

function dipper_appear() {
  $('#dipper-popup').fadeIn();
  setTimeout(dipper_disappear, 500);
}

function dipper_disappear() {
  $('#dipper-popup').fadeOut();
}

function laugh() {
  if(!mute_flag)
    laugh_sound.play();
  setTimeout(laugh_stop, 5000);
}

function laugh_stop() {
  if(!mute_flag) {
    laugh_sound.pause();
    laugh_sound.load();
  }
}

function mabel_appear() {
  $('#mabel-popup').fadeIn();
  setTimeout(mabel_disappear, 500);
}

function mabel_disappear() {
  $('#mabel-popup').fadeOut();
}

function lightning() {
  if(!mute_flag) {
    lightning_sound.play();
  }
  lightning_flash();
  setTimeout(lightning_flash, 400);
  setTimeout(lightning_flash, 600);
  var ghost_chance = Math.floor(Math.random() * 5);
  /* 1/5 chance of ghosts appearing */
  if(ghost_chance == 0) {
    dipper_appear();
    mabel_appear();
  }
}

function lightning_flash() {
  b_command = "brightness(150%)";
  $('#main-panel').css('-webkit-filter', b_command);
  $('#main-panel').css('filter', b_command);
  setTimeout(lightning_unflash, 100);
}

function lightning_unflash() {
  b_command = "brightness(100%)";
  $('#main-panel').css('-webkit-filter', b_command);
  $('#main-panel').css('filter', b_command);
}

function tap_window() {
  if(!mute_flag)
    knock_sound.play();
  var element = document.getElementById('window');
  element.setAttribute('src', 'anim/GIFs/window.gif');
  $('#window-div').show();
  setTimeout(reset_window, 5000);
}

function reset_window() {
  $('#window-div').hide();
}

function whisper() {
  if(!mute_flag)
    whisper_sound.play();
  setTimeout(whisper_stop, 8000);
}

function whisper_stop() {
  if(!mute_flag) {
    whisper_sound.pause();
    whisper_sound.load();
  }
}
