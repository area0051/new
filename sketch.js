let x = 300;
let y = 200;
let c_x = 120;
let c_y = 200;
let t = 0;
let shot_flag = 0;
let sp = 1;
let dead_flag = 0;
let dead_t = 0;
let score = 0;
class Shadow{
  constructor(){
    this.x = 0;
    this.y = 0;
  }
}

class Effect{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.t = 0;
    this.message = "";
  }
}

let shadowList = [];
let effectList = [];

function setup() {
  createCanvas(600, 400);
  gameInit();
}


function draw() {
  background(255, 200, 0);
  t += sp;
  
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(100);
  text(score, width/2, height/2 - 100);
  textSize(16);
  fill(100);
  text("Rank D", width/2, height/2 - 60);
  if(dead_flag == 0){
    if(shot_flag == 1){
      x += (c_x - x) * 0.1;
      y += (c_y - y) * 0.1;
      
      if(dist(x, y, c_x, c_y) < 20){
        
        c_x = 600 - c_x;
        sp += 0.3;
        shot_flag = 0;
        score += 1;
        
        addEffect(x, y, 1);
      }
    }
  }
  
  if(dead_flag == 0){
    renderShadowList();
    
    fill(0, 200, 200);
    ellipse(x, y, 20, 20);
    
    addShadow(x, y);
  }else{
    dead_t += 1;
    if(dead_t < 60){
      for(let i=0; i<10; i++){
        let angle = i * 36;
        let rad = radians(angle);
        let _x = cos(rad) * dead_t + x;
        let _y = sin(rad) * dead_t + y;
        fill(0, 200, 200);
        ellipse(_x, _y, 5, 5);
      }
    }
  }
 
  
  near_flag = 0;
  for(let i=0; i<120; i++){
    let angle = i * 2.5 + t - 90;
    let rad = radians(angle);
    let _x = c_x + cos(rad) * 100;
    let _y = c_y + sin(rad) * 100;
    
    let kyori = dist(_x, _y, x, y);
    
    if(kyori < 20){
      dead_flag = 1;
    }
    fill(255);
    noStroke();
    ellipse(_x, _y, 20, 20);
  }
  
  if(dead_flag == 1){
    textSize(32);
    fill(255);
    text("- enter -", width/2, 350);
  }
  
  renderEffectList();
}

function mousePressed(){
  if(dead_flag == 0){
    shot_flag = 1; 
  }
}
function keyPressed(){
  if(dead_flag == 1){
    gameInit(); 
  }
}

function gameInit(){
  x = 300;
  y = 200;
  c_x = 120;
  c_y = 200;
  t = 0;
  shot_flag = 0;
  sp = 1;
  dead_flag = 0;
  dead_t = 0;
  score = 0;
  shadowList = [];
  effectList = [];
}

function addEffect(x, y, point){
  let effect = new Effect();
  effect.x = x;
  effect.y = y;
  effect.message = "+" + point;
  effectList.push(effect);
}

function renderEffectList(){
  for(let i=0; i<effectList.length; i++){
    let effect = effectList[i];
    effect.t += 1;
    if(effect.t < 60){
      let alpha = 1 - effect.t / 60;
      textAlign(CENTER, CENTER);
      textSize(24);
      fill(255, 255 * alpha);
      text(effect.message, effect.x, effect.y - effect.t * 0.5);
    }
  }
}

function addShadow(x, y){
  let shadow = new Shadow();
  shadow.x = x;
  shadow.y = y;
  shadowList.unshift(shadow);
  if(shadowList.length > score){
    shadowList.splice(score, 1);
  }
}
function renderShadowList(){
  for(let i=0; i<shadowList.length; i++){
    let shadow = shadowList[i];
    let alpha = 1 - i / 10;
    fill(0, 200, 200, 50 * alpha);
    ellipse(shadow.x, shadow.y, 20, 20);
  }
}