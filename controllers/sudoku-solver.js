const errorMessages = require('../config/errorMessages.json')

class SudokuSolver {
  validate(puzzleString) {
    const match = /^[0-9.]+$/;

      if (!match.test(puzzleString)) {
      return { error: errorMessages.invalidChar };
    } else if (puzzleString.length !== 81) {
      return { error: errorMessages.length };
    }

    return puzzleString
  }

  constructSudokuObj(string) {
    let splitString = string.split('');
    let result = {};
    for (let i = 0; i < 9; i++) {
      result[i] = [];
      for (let n = 0; n < 9; n++) {
        result[i].push(splitString[i * 9 + n]);
      }
    }
    return result;
  }

  updateWithCheckNumber(array, placement, value) {
    const string = array.join('');
    return (
      string.substring(0, Number(placement) - 1) +
      value +
      string.substring(Number(placement))
    );
  }

  letterToIndex(letter) {
    const mapping = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
      g: 6,
      h: 7,
      i: 8,
    };
    return mapping[letter];
  }

  onlyUniqueNumbers(string) {
    let uniqueNumbers = new Set();
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== '.') {
        if (uniqueNumbers.has(string[i])) {
          return false;
        }
        uniqueNumbers.add(string[i]);
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const normalizedRow = row.toLowerCase()
    const relevantPuzzleArray =
      this.constructSudokuObj(puzzleString)[this.letterToIndex(normalizedRow)];
    const puzzleStringUpdated = this.updateWithCheckNumber(
      relevantPuzzleArray,
      column,
      value
    );

    if (!this.onlyUniqueNumbers(puzzleStringUpdated)) {
      return false;
    } else {
      return true;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    const normalizedRow = row.toLowerCase();
    const columnArray = [];
    for (let i = 0; i < 9; i++) {
      columnArray[i] = this.constructSudokuObj(puzzleString)[i][column - 1];
    }
    const puzzleStringUpdated = this.updateWithCheckNumber(
      columnArray,
      this.letterToIndex(normalizedRow) + 1,
      value
    );

    if (!this.onlyUniqueNumbers(puzzleStringUpdated)) {
      return false;
    } else {
      return true;
    }
  }

  stringToRegArray(string) {
    const coordinates = {
      0: [0, 1, 2, 9, 10, 11, 18, 19, 20],
      1: [3, 4, 5, 12, 13, 14, 21, 22, 23],
      2: [6, 7, 8, 15, 16, 17, 24, 25, 26],
      3: [27, 28, 29, 36, 37, 38, 45, 46, 47],
      4: [30, 31, 32, 39, 40, 41, 48, 49, 50],
      5: [33, 34, 35, 42, 43, 44, 51, 52, 53],
      6: [54, 55, 56, 63, 64, 65, 72, 73, 74],
      7: [57, 58, 59, 66, 67, 68, 75, 76, 77],
      8: [60, 61, 62, 69, 70, 71, 78, 79, 80],
    };
    let result = [];
    for (let i = 0; i < 9; i++) {
      result.push([]);
    }

    for (let i = 0; i < Object.keys(coordinates).length; i++) {
      for (let j = 0; j < coordinates[i].length; j++) {
        result[i].push(string[coordinates[i][j]]);
      }
    }
    for (let i = 0; i < Object.keys(coordinates).length; i++) {
      result[i] = result[i].join('');
    }
    return result;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = this.letterToIndex(row.toLowerCase());
    let sudokuObjUpdated = { ...this.constructSudokuObj(puzzleString) };
    sudokuObjUpdated[rowIndex][column - 1] = value;
    let puzzleStringUpdated = '';
    for (let prop in sudokuObjUpdated) {
      puzzleStringUpdated += sudokuObjUpdated[prop].join('');
    }
    const chunkedArray = this.stringToRegArray(puzzleStringUpdated);
    const normalizedRow = row.toLowerCase();
    const indexNumber = Number(column) * (this.letterToIndex(normalizedRow) + 1);
    let arrayIndex = Math.floor(indexNumber / 9);
    if (arrayIndex === 9) {
      arrayIndex = 8
    }
    if (!this.onlyUniqueNumbers(chunkedArray[arrayIndex])) {
      return false;
    } else {
      return true;
    }
  }

  solve(puzzleString) {
    const sudokuObj = this.constructSudokuObj(puzzleString);
    const numberLetterTable = {
      0: 'a',
      1: 'b',
      2: 'c',
      3: 'd',
      4: 'e',
      5: 'f',
      6: 'g',
      7: 'h',
      8: 'i',
    };

    const findEmptySpot = (sudokuObj) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (sudokuObj[i][j] === '.') {
            return [i, j];
          }
        }
      }
      return null;
    };
    const isValidPlacement = (puzzleString, row, column, value) => {
      const letter = numberLetterTable[row];
      return (
        this.checkRowPlacement(puzzleString, letter, column + 1, value) &&
        this.checkColPlacement(puzzleString, letter, column + 1, value) &&
        this.checkRegionPlacement(puzzleString, letter, column + 1, value)
      );
    };

    const solveHelper = (sudokuObj, puzzleString) => {
      const emptySpot = findEmptySpot(sudokuObj);
      if (!emptySpot) {
        return true;
      }

      const [row, col] = emptySpot;
      for (let value = 1; value <= 9; value++) {
        const valueStr = value.toString();
        if (isValidPlacement(puzzleString, row, col, valueStr)) {
          sudokuObj[row][col] = valueStr;
          if (solveHelper(sudokuObj, puzzleString.slice(0, row * 9 + col) + valueStr + puzzleString.slice(row * 9 + col + 1))) {
            return true;
          }
          sudokuObj[row][col] = '.';
        }
      }
      return false;
    };

    if (solveHelper(sudokuObj, puzzleString)) {
      let solvedString = '';
      for (let i = 0; i < 9; i++) {
        solvedString += sudokuObj[i].join('');
      }
      return solvedString;
    } else {
      return { error: 'Puzzle cannot be solved' };
    }
  }
}

module.exports = SudokuSolver;
