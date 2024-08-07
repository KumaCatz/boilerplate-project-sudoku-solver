"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const errorMessages = require("../config/errorMessages.json");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (
      !puzzle ||
      puzzle.length === 0 ||
      !coordinate ||
      coordinate.length === 0 ||
      !value ||
      value.length === 0
    ) {
      return res.json({ error: errorMessages.fields });
    }
    const coordRegex = /^[a-i][1-9]$/i;
    const checkCoord = coordRegex.test(coordinate);
    if (!checkCoord) {
      return res.json({ error: errorMessages.coordinate });
    }
    const valRegex = /^[1-9]$/;
    const checkVal = valRegex.test(value);
    if (!checkVal) {
      return res.json({ error: errorMessages.value });
    }
    try {
      const row = coordinate[0];
      const column = coordinate[1];
      const validation = solver.validate(puzzle);
      if (validation.error) {
        return res.json(validation);
      }
      const isRowValid = solver.checkRowPlacement(puzzle, row, column, value);
      const isColValid = solver.checkColPlacement(puzzle, row, column, value);
      const isRegionValid = solver.checkRegionPlacement(
        puzzle,
        row,
        column,
        value,
      );
      if (isRowValid && isColValid && isRegionValid) {
        return res.json({ valid: true });
      } else {
        let conflict = [];
        if (!isRowValid) {
          conflict.push("row");
        }
        if (!isColValid) {
          conflict.push("column");
        }
        if (!isRegionValid) {
          conflict.push("region");
        }
        return res.json({ valid: false, conflict });
      }
    } catch (err) {
      return res.json(err);
    }
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    try {
      if (!puzzle || puzzle.length === 0) {
        return res.json({ error: errorMessages.field });
      }
      const validation = solver.validate(puzzle);
      if (validation.error) {
        return res.json(validation);
      }
      const solution = solver.solve(puzzle);
      if (solution.error) {
        return res.json(solution);
      }
      return res.json({ solution: solution });
    } catch (err) {
      return res.json(err);
    }
  });
};
