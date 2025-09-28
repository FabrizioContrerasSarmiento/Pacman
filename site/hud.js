const yHud = 40; 

function HUD(level) {

  this.level = level;
  this.score_multiplier = 1;
  this.color = "yellow";

  this.show = function () {
    const p0 = pacmans[0];  
    const score0 = p0 ? p0.score : 0;
    const lives = p0 ? p0.lives : 0;

    fill(CFG.hud.textColor || "#FFFFFF");

    // ----- SCORE (izquierda) -----
    textSize(CFG.hud.scoreSize || 20);
    textAlign(LEFT, CENTER);
    text("score: " + score0, 100, yHud);

    // ----- LEVEL (centro) -----
    textSize(CFG.hud.levelSize || 20);
    textAlign(CENTER, CENTER);
    text("level: " + this.level, width / 2, yHud);

    // ----- VIDAS (derecha) -----
    const maxHeartsShown = 3;
    const heartsToDraw = Math.min(lives, maxHeartsShown);
    const heartSize = 25;
    const margin = 10;
    const rightPad = 100;

    for (let j = 0; j < heartsToDraw; j++) {
      const x = width - rightPad - j * (heartSize + margin) - heartSize / 2;
      if (heart_img) image(heart_img, x, yHud, heartSize, heartSize);
    }

    // ----- GAME OVER (igual que antes) -----
    if (gameover && CFG.hud.gameOver && CFG.hud.gameOver.enabled) {
      const go = CFG.hud.gameOver;
      const box = go.box || {};
      const cx = width / 2;
      const cy = height / 2 + (box.yOffset || -200);

      if (box.enabled) {
        rectMode(CENTER);
        noStroke();
        fill(box.fill || "rgba(0,0,0,0.70)");
        if (box.stroke) {
          stroke(box.stroke);
          strokeWeight(box.strokeWeight || 4);
        } else {
          noStroke();
        }
        rect(cx, cy, box.width || 500, box.height || 200, box.cornerRadius || 20);
      }

      noStroke();
      fill(go.titleColor || "#FFD700");
      textAlign(CENTER, CENTER);
      textSize(go.titleSize || 64);
      text(go.title || "GAME OVER", cx, cy - 40);

      fill(go.subtitleColor || "#FFFFFF");
      textSize(go.subtitleSize || 28);
      text(go.subtitle || "Presiona '1' o '2' para jugar de nuevo", cx, cy + 40);

      textAlign(LEFT, BASELINE);
    }
  };

  this.updateLevel = function (level) {
    this.level = level;
  };

  this.updateHighScore = function () {
    if (Number(this.score.toString().replace(",", "")) > Number(high_score.toString().replace(",", ""))) {
      high_score = addCommas(this.score);
    }
  };
}


