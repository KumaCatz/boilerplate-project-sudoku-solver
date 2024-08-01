'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    const row = coordinate[0]
    const column = coordinate[1]
    try {
      // solver.validate(puzzle)
      solver.checkRowPlacement(puzzle, row, column, value)
      solver.checkColPlacement(puzzle, row, column, value)
      solver.checkRegionPlacement(puzzle, row, column, value)
      return res.json({valid: true})
    } catch(err) {
      return res.json(err)
    }
  });

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body;
    try {
      // solver.validate(puzzle)
      const solution = solver.solve(puzzle)
      return res.json({ solution: solution });
    } catch(err) {
      return res.json(err)
    }
  });
};
