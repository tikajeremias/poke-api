type Props = {
  currentFilter: string;
  onFilterChange: (source: string) => void;
};
// Este componente contiene los botones para filtrar segun el origen del pokemon
const FilterButtons = ({ currentFilter, onFilterChange }: Props) => {
  const filters = ["all", "api", "created"];
  return (
    <div className="flex">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-md text-white ml-2 hover:bg-gray-300 transition-colors ${currentFilter === filter ? "bg-gray-800" : "bg-gray-400"
            }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
