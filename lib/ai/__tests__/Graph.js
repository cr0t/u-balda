import Graph from '../Graph'

// Star symbol (*) shows start point of the future Graph

const cellsFOR = [
  '*', '',  '',
  'f', 'o', 'r',
  '',  '',  '',
];

const cellsWithCycle = [
  '',  's', 't',
  'f', 'o', 'r',
  '',  '*', '',
];

const cellsComplex = [
  '',  '',  'к', '',  '',
  '',  'к', 'о', 'о', '',
  'б', 'а', 'ч', 'к', 'и',
  '',  'к', '',  'а', 'м',
  '*', 'т', '',  '',  '',
];

test('builds a simple directed graph', () => {
  const graph = {
    index: 0,
    character: '*',
    children: [{
      index: 3,
      character: 'f',
      children: [{
        index: 4,
        character: 'o',
        children: [{
          index: 5,
          character: 'r',
          children: [],
        }]
      }]
    }]
  };

  expect(new Graph(cellsFOR, 0).graph).toEqual(graph);
});

test('builds a simple directed graph with a joint', () => {
  const cellsFORSeven = [
    '',  '',  '',
    'f', 'o', 'r',
    '',  '*', '',
  ];

  const graph = {
    index: 7,
    character: '*',
    children: [{
      index: 4,
      character: 'o',
      children: [{
        index: 3,
        character: 'f',
        children: [],
      },{
        index: 5,
        character: 'r',
        children: []
      }]
    }]
  };

  expect(new Graph(cellsFORSeven, 7).graph).toEqual(graph);
});

test('builds a directed graph with joints avoiding cycles', () => {
  const graph = {
    index: 7,
    character: '*',
    children: [{
      index: 4,
      character: 'o',
      children: [{
        index: 1,
        character: 's',
        children: [{
          index: 2,
          character: 't',
          children: [{
            index: 5,
            character: 'r',
            children: []
          }]
        }],
      },{
        index: 3,
        character: 'f',
        children: []
      },{
        index: 5,
        character: 'r',
        children: [{
          index: 2,
          character: 't',
          children: [{
            index: 1,
            character: 's',
            children: []
          }]
        }]
      }]
    }],
  };

  expect(new Graph(cellsWithCycle, 7).graph).toEqual(graph);
});

test('generates all possible paths', () => {
  const pathsFOR = [
    ['*', 'f', 'o', 'r']
  ];
  const pathsWithCycle = [
    ['*', 'o', 's', 't', 'r'],
    ['*', 'o', 'f'],
    ['*', 'o', 'r', 't', 's'],
  ];
  const pathsComplex = [
    ['*', 'т', 'к', 'а', 'к', 'о', 'к'],
    ['*', 'т', 'к', 'а', 'к', 'о', 'ч', 'к', 'о'],
    ['*', 'т', 'к', 'а', 'к', 'о', 'ч', 'к', 'а', 'м', 'и'],
    ['*', 'т', 'к', 'а', 'к', 'о', 'ч', 'к', 'и', 'м', 'а'],
    ['*', 'т', 'к', 'а', 'к', 'о', 'о', 'к', 'а', 'м', 'и'],
    ['*', 'т', 'к', 'а', 'к', 'о', 'о', 'к', 'ч'],
    ['*', 'т', 'к', 'а', 'к', 'о', 'о', 'к', 'и', 'м', 'а'],
    ['*', 'т', 'к', 'а', 'б'],
    ['*', 'т', 'к', 'а', 'ч', 'о', 'к'],
    ['*', 'т', 'к', 'а', 'ч', 'о', 'к'],
    ['*', 'т', 'к', 'а', 'ч', 'о', 'о', 'к', 'а', 'м', 'и'],
    ['*', 'т', 'к', 'а', 'ч', 'о', 'о', 'к', 'и', 'м', 'а'],
    ['*', 'т', 'к', 'а', 'ч', 'к', 'о', 'о', 'к'],
    ['*', 'т', 'к', 'а', 'ч', 'к', 'о', 'о', 'к'],
    ['*', 'т', 'к', 'а', 'ч', 'к', 'а', 'м', 'и'],
    ['*', 'т', 'к', 'а', 'ч', 'к', 'и', 'м', 'а']
  ];

  expect(new Graph(cellsFOR, 0).paths).toEqual(pathsFOR);
  expect(new Graph(cellsWithCycle, 7).paths).toEqual(pathsWithCycle);
  expect(new Graph(cellsComplex, 20).paths).toEqual(pathsComplex);
});
