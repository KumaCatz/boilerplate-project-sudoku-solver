const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('solving puzzles', () => {
        // test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
        
        // })
        // test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
            
        // })
        // test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
            
        // })
        // test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
            
        // })
        // test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
            
        // })
    })
    suite('checking puzzles', () => {
        // test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
            
        // })
        // test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
            
        // })
    })
});
