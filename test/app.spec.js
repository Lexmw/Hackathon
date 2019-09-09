const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
  it('should contain a <h1> element for the page title', () => { 
    pageObject
      .evaluate(() => document.querySelector('h1').innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('🎇Inspiration for your Vision Board🎇');
      });
  });

  it('should contain input with name: searchTerm', () => {
      pageObject
       .evaluate(() => document.querySelector('input[name=searchTerm]'))
       .then(input => expect(input).to.exist)
  });

  it('should have a selector with the name of picCount',() => {
      pageObject
      .evaluate(() => document.querySelector('select[name=picCount]'))
      .then(input => expect(input).to.exist)
  });

  it('should be a button with the id search', () => {
      pageObject
      .evaluate(() => document.getElementById('search'))
      .then(input => expect(input).to.exist)
  });

  it('should be a button with the id clear', () => {
    pageObject
    .evaluate(() => document.getElementById('clear'))
    .then(input => expect(input).to.exist)
});

it('should correctly search a photo', () => {
  pageObject
  .wait()
  .type('input[name=searchTerm]', 300000)
  .select('select[name=picCount]', 12)
  .click('button#search')
  .wait('#output')
  .evaluate(() => document.querySelector('#output'))
  .then((outputIMG) => {expect(outputIMG).to.exist.timeout(6500)});
});
})