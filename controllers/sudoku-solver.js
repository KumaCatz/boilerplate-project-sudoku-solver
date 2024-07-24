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

  updateWithCheckNumber(string, placement, value) {
    return (
      string.substring(0, Number(placement) - 1) +
      value +
      string.substring(Number(placement))
    );
  };

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
      j: 9,
    };
    return mapping[letter];
  };
  
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

  stringToRowArray(string, size) {
    const result = [];
    for (let i = 0; i < string.length; i += size) {
      result.push(string.slice(i, i + size));
    }
    return result;
  };

  checkRowPlacement(puzzleString, row, column, value) {
    const normalizedRow = row.toLowerCase();
    const chunkedArray = this.stringToRowArray(puzzleString, 9);
    const relevantPuzzleString = chunkedArray[this.letterToIndex(normalizedRow)];
    const puzzleStringUpdated = this.updateWithCheckNumber(
      relevantPuzzleString,
      column,
      value
    );

    if (!this.onlyUniqueNumbers(puzzleStringUpdated)) {
      console.log('false row');
      return false;
    } else {
      return true;
    }
  }

  stringToColArray(string, positions) {
    const result = [];
    for (let i = 0; i < positions.length; i++) {
      result.push([]);
    }
    for (let i = 0; i < string.length; i++) {
      const subArrayIndex = positions.findIndex(
        (index) => i % 9 === index % 9
      );
      if (subArrayIndex !== -1) {
        result[subArrayIndex].push(string[i]);
      }
    }
    for (let i = 0; i < positions.length; i++) {
      result[i] = result[i].join('')
    }
    return result;
  };

  checkColPlacement(puzzleString, row, column, value) {
    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const normalizedRow = row.toLowerCase();
    const chunkedArray = this.stringToColArray(puzzleString, positions);
    const relevantPuzzleString = chunkedArray[column - 1];
    const puzzleStringUpdated = this.updateWithCheckNumber(
      relevantPuzzleString,
      this.letterToIndex(normalizedRow) + 1,
      value
    );

    if (!this.onlyUniqueNumbers(puzzleStringUpdated)) {
      console.log('false column');
      return false;
    } else {
      return true;
    }
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
