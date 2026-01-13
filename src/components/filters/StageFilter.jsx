import React from 'react';
import { useTournament } from '../../contexts/TournamentContext';
import { useFilters } from '../../contexts/FilterContext';

const StageFilter = () => {
  const { stages } = useTournament();
  const { selectedStage, setSelectedStage } = useFilters();

  if (!stages || stages.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Filter by Stage</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStage(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            selectedStage === null
              ? 'bg-primary-maroon text-secondary-white'
              : 'bg-secondary-teal text-secondary-white hover:bg-secondary-dark-teal'
          }`}
        >
          All Stages
        </button>
        {stages.map((stage) => (
          <button
            key={stage.stage_id}
            onClick={() => setSelectedStage(stage.stage_id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedStage === stage.stage_id
                ? 'bg-primary-maroon text-secondary-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {stage.stage_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StageFilter;
