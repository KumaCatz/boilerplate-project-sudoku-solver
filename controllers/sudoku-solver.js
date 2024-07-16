class SudokuSolver {
  validate(puzzleString) {
    const match = /^[0-9.]+$/;

    if (!puzzleString || puzzleString.length === 0) {
      throw { error: 'Required field missing' };
    } else if (!match.test(puzzleString)) {
      throw { error: 'Invalid characters in puzzle' };
    } else if (puzzleString.length !== 81) {
      throw { error: 'Expected puzzle to be 81 characters long' };
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // if (!isValid) {
    //   throw {valid: false, conflict: 'row'}
    // }
  }

  checkColPlacement(puzzleString, row, column, value) {
    // if (!isValid) {
    //   throw {valid: false, conflict: 'column'}
    // }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // if (!isValid) {
    //   throw {valid: false, conflict: 'region'}
    // }
  }

  solve(puzzleString) {
    // if (!solution) {
    //   throw {error: 'Puzzle cannot be solved' }
    // }
  }
}

module.exports = SudokuSolver;
