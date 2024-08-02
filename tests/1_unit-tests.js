const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {
    suite('Handling puzzle strings', () => {
        test('Logic handles a valid puzzle string of 81 characters', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            assert.equal(solver.validate(puzzleString), puzzleString)
        })
        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.xx!!9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            assert.deepEqual(solver.validate(puzzleString), { error: 'Invalid characters in puzzle' })
        })
        test('Logic handles a puzzle string that is not 81 characters in length', () => {
            const puzzleString = '...'
            assert.deepEqual(solver.validate(puzzleString), { error: 'Expected puzzle to be 81 characters long' })
        })
    })
    suite('Handling row/col/region placements', () => {
        const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        test('Logic handles a valid row placement', () => {
            assert.isTrue(solver.checkRowPlacement(puzzleString, 'a', 2, 3))
        })
        test('Logic handles an invalid row placement', () => {
            assert.isFalse(solver.checkRowPlacement(puzzleString, 'a', 2, 8))
        })
        test('Logic handles a valid column placement', () => {
            assert.isTrue(solver.checkColPlacement(puzzleString, 'b', 1, 5))
        })
        test('Logic handles an invalid column placement', () => {
            assert.isFalse(solver.checkColPlacement(puzzleString, 'b', 1, 3))
        })
        test('Logic handles a valid region (3x3 grid) placement', () => {
            assert.isTrue(solver.checkRegionPlacement(puzzleString, 'b', 2, 9))
        })
        test('Logic handles an invalid region (3x3 grid) placement', () => {
            assert.isFalse(solver.checkRegionPlacement(puzzleString, 'b', 2, 6))
        })
    })
    suite('Solver tests', () => {
        test('Valid puzzle strings pass the solver', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            assert.equal(solver.solve(puzzleString), '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
        })
        test('Invalid puzzle strings fail the solver', () => {
            const puzzleString = '..9..5.1.85.4....2432..4...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            assert.deepEqual(solver.solve(puzzleString), { error: 'Puzzle cannot be solved' })
        })
        // wtf is this test supposed to be?
        // test('Solver returns the expected solution for an incomplete puzzle'), () => {
        //     
        // }
    })
});
