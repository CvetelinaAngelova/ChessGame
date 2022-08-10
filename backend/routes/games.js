const express = require('express');
const router = express.Router();
const kokopu = require('kokopu');
const fs = require('fs');

router.get('/games', function(req, res, next) {
  const pgnText = fs.readFileSync('database.pgn', 'utf8');
  const database = kokopu.pgnRead(pgnText);

  const result = [];
  for (let i = 0; i < database.gameCount(); i++) {
    const game = database.game(i);
    const moves = game.mainVariation().nodes().map(node => node.notation());
    const position = new kokopu.Position();
    const fens = [position.fen()];
    moves.forEach((move) => {
      position.play(move);
      fens.push(position.fen());
    });
    const gameObj = {
      white: game.playerName('w'),
      black: game.playerName('b'),
      date: game.date(),
      result: game.result(),
      moves: moves,
      fens: fens
    };

    result.push(gameObj);
  }

  res.status(200).send(result);
});

module.exports = router;
