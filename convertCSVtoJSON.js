import fs from 'fs';
import csv from 'csv-parser';
import fse from 'fs-extra';
import path from 'path';

const csvFolder = './tables';
const outputFolder = './public/data';

const dataModels = {
  'Teams': {
    team_id: 'integer',
    team_name: 'string',
    country: 'string',
    group_name: 'string',
    fifa_ranking: 'integer',
    coach_name: 'string',
  },
  'Fixtures': {
    fixture_id: 'integer',
    match_date: 'string',
    match_time: 'string',
    stage_id: 'integer',
    round_name: 'string',
    venue_id: 'integer',
    home_team_id: 'integer',
    away_team_id: 'integer',
    home_goals: 'integer-nullable',
    away_goals: 'integer-nullable',
    home_goals_ht: 'integer-nullable',
    away_goals_ht: 'integer-nullable',
    match_status: 'string',
    attendance: 'integer-nullable',
    winner: 'string-nullable',
    extra_time: 'boolean',
    penalties: 'boolean',
  },
  'Players': {
    player_id: 'integer',
    player_name: 'string',
    team_id: 'integer',
    position: 'string',
  },
  'Venues': {
    venue_id: 'integer',
    venue_name: 'string',
    city: 'string',
    capacity: 'integer',
    latitude: 'float',
    longitude: 'float',
  },
  'Tournament_Stages': {
    stage_id: 'integer',
    stage_name: 'string',
    stage_order: 'integer',
    knockout_stage: 'boolean',
  },
  'Player_Statistics': {},
  'Team_Statistics': {},
  'Goals': {},
  'Cards': {},
  'Tournament_Summary': {},
};

const convertValue = (value, type) => {
  if (value === 'NULL' || value === '') {
    if (type.endsWith('-nullable') || type === 'integer' || type === 'float') {
        return null;
    }
    return '';
  }

  switch (type) {
    case 'integer':
    case 'integer-nullable':
      return parseInt(value, 10);
    case 'float':
      return parseFloat(value);
    case 'boolean':
      return value.toUpperCase() === 'TRUE';
    default:
      return value;
  }
};

const convertCsvToJson = (csvFilePath, jsonFilePath, dataModel) => {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      const processedRow = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const originalValue = data[key];
          const cleanKey = key.trim();
          const targetType = dataModel[cleanKey];

          if (targetType) {
            processedRow[cleanKey] = convertValue(originalValue, targetType);
          } else {
            processedRow[cleanKey] = originalValue;
          }
        }
      }
      results.push(processedRow);
    })
    .on('end', () => {
      fse.outputJson(jsonFilePath, results, { spaces: 2 }, (err) => {
        if (err) {
          console.error(`Error writing JSON file ${jsonFilePath}:`, err);
        } else {
          console.log(`Successfully converted ${csvFilePath} to ${jsonFilePath}`);
        }
      });
    });
};

fs.readdir(csvFolder, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  files.forEach((file) => {
    if (file.endsWith('.csv')) {
      const csvFilePath = path.join(csvFolder, file);
      const baseName = file.includes('table - ') ? file.substring('table - '.length, file.length - 4) : path.basename(file, '.csv');
      const jsonFileName = `${baseName}.json`;
      const jsonFilePath = path.join(outputFolder, jsonFileName);
      
      const dataModel = dataModels[baseName] || {};
      
      convertCsvToJson(csvFilePath, jsonFilePath, dataModel);
    }
  });
});