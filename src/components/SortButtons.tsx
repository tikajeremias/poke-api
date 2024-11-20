type Props = {
  currentSort: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
};

// Este componente contiene los botones para ordenar los pokemones alfabeticamente
const SortButtons = ({ currentSort, onSortChange }: Props) => {
  return (
    <div className="flex">
      <button
        onClick={() => onSortChange("asc")}
        className={`px-4 py-2 rounded-md text-white ml-2 hover:bg-gray-300 transition-colors ${
          currentSort === "asc" ? "bg-gray-800" : "bg-gray-400"
        }`}
      >
        Ascendente
      </button>
      <button
        onClick={() => onSortChange("desc")}
        className={`px-4 py-2 rounded-md text-white ml-2 hover:bg-gray-300 transition-colors ${
          currentSort === "desc" ? "bg-gray-800" : "bg-gray-400"
        }`}
      >
        Descendente
      </button>
    </div>
  );
};

export default SortButtons;
