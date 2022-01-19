function grid(x,y,w){
  setFillColor("White");
  rect(x,y,w,w);
  row(x,y,w,0);
  row(x,y,w,1);
  row(x,y,w,2);
  row(x,y,w,3);
}
function fillerCheck(filler) {
  onEvent("filler"+filler, "click", function() {
    hideElement("filler"+filler);
    clicks++;
  });
  
}
function row(x,y,w,amtY){
  rect(x,y+(amtY*(w/4)),w/4,w/4);
  rect(x+w/4,y+(amtY*(w/4)),w/4,w/4);
  rect(x+w/4+w/4,y+(amtY*(w/4)),w/4,w/4);
  rect(x+w/4+w/4+w/4,y+(amtY*(w/4)),w/4,w/4);
}

onEvent("btnStart1", "click", function() {
  setScreen("scrnPlay");
  hideElement("canvasBack");
  showElement("canvasExample");
  t = setTimeout(function() {
  hideElement("canvasExample");
  for (var i = 0; i < 16; i++) {
    hideElement("fillerb"+i);
  }
}, time);
for(var i=0;i<16;i++){
  hideElement("filler"+i);
}
});
          //SET UP FOR PLAY SCREEN
setActiveCanvas("canvasExample");
setFillColor("White");
setActiveCanvas("canvasExample");
grid(0,0,100);
setActiveCanvas("canvasBack");
grid(0,0,200);
          //GAMEPLAY
var time = 10000;
var wins=0;
var clicks=0;
var plays=0;
var losses=0;
var filler = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fillerb = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
onEvent("btnEasy", "click", function() {
  time=10000;
  setText("txtDifficulty","Easy");
});
onEvent("btnMedium", "click", function() {
  time=5000;
  setText("txtDifficulty","Medium");
});
onEvent("btnHard", "click", function() {
  time = 3000;
  setText("txtDifficulty","Hard");
});
for(var i =0;i<16;i++){
  fillerb[i]=randomNumber(0,1);
}
for (var i = 0; i < 16; i++) {
    if (fillerb[i]==1){
    showElement("fillerb"+i);
  }
}
var t;
var mirrorCheck;
onEvent("btnStart2", "click", function() {
  for (var i = 0; i < 16; i++) {
    hideElement("fillerb"+i);
  }
  hideElement("canvasExample");
  showElement("canvasBack");
  for(var j=0;j<16;j++){
  showElement("filler"+j);
}
  //THIS IS THE TIME FUNCTION!!!!(in milliseconds)
t = setTimeout(function() {
  setScreen("scrnTime");
}, time);
fillerCheck(0);
fillerCheck(1);
fillerCheck(2);
fillerCheck(3);
fillerCheck(4);
fillerCheck(5);
fillerCheck(6);
fillerCheck(7);
fillerCheck(8);
fillerCheck(9);
fillerCheck(10);
fillerCheck(11);
fillerCheck(12);
fillerCheck(13);
fillerCheck(14);
fillerCheck(15);
onEvent("btnFinish", "click", function() {
  setScreen("screenEnd");
  clearTimeout(t);
    for(var i =0; i<16;i++){
    filler[i]=1;
  if(getProperty("filler"+i,"hidden")){
    filler[i]=0;
  }
}
  for(var j =0;j<16;j++){
    if(filler[j]!==fillerb[j]){
      mirrorCheck=0;
    }else{
      if(mirrorCheck===0){
        
      }else{
        mirrorCheck=1;
      }
    }
  }
  if(mirrorCheck==1){
  showWin();
}
if(mirrorCheck===0){
  showLose();
}
});
});
onEvent("btnClear","click",function(){
  for(var i=0;i<16;i++){
    showElement("filler"+i);
  }
});
// END GAME SCREEN
function showWin() {
  showElement("labelWin1");
  showElement("labelWin2");
  showElement("labelWin3");
  showElement("labelWin4");
  hideElement("labe1Lose1");
  hideElement("labelLose2");
  hideElement("labelLose3");
  hideElement("labelLose4");
}
function showLose(){
  showElement("labe1Lose1");
  showElement("labelLose2");
  showElement("labelLose3");
  showElement("labelLose4");
  hideElement("labelWin1");
  hideElement("labelWin2");
  hideElement("labelWin3");
  hideElement("labelWin4");
}
onEvent("labelLose4", "click", function() {
  setScreen("scrnStart");
  losses++;
  reset();
createRecord("Wins-Losses", {WinLoss:'0'}, function(record) {
  console.log("loss");
});
});
onEvent("labelWin4", "click", function() {
  setScreen("scrnWin");
  wins++;
createRecord("Wins-Losses", {WinLoss:'1'}, function(record) {
  console.log("Win");
});
});
onEvent("btnRetry1", "click", function( ) {
  setScreen("scrnStart");
  losses++;
  reset();
createRecord("Wins-Losses", {WinLoss:'0'}, function(record) {
  console.log("timeout loss");
});
});
onEvent("btnRetry2", "click", function() {
  setScreen("scrnStart");
  reset();
});
onEvent("labelWin4", "click", function() {
  plays = wins+losses;
  setText("txtWin",wins);
  setText("txtLoss",losses);
  setText("txtPlay", plays);
  setText("txtWin%",(Math.round((wins/plays)*100))+"%");
  setText("txtClicks",clicks);
});
function reset(){
  fillerb = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  filler = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  showElement("canvasExample");
  for(var i=0;i<16;i++){
    showElement("filler"+i);
  }
  for(var j =0;j<16;j++){
    fillerb[j]=randomNumber(0,1);
    if (fillerb[j]==1){
        showElement("fillerb"+j);
    }
  }
  mirrorCheck=1;
}