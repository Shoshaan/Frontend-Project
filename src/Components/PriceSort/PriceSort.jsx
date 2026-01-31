import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

export const PriceSort = ({ onAsc, onDesc, active }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <button
        className={`btn btn-sm ${active === "asc" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={onAsc}
        style={{ cursor: "pointer" }}
      >
        <FaSortAmountUp />
      </button>
      <button
        className={`btn btn-sm ${active === "desc" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={onDesc}
        style={{ cursor: "pointer" }}
      >
        <FaSortAmountDown />
      </button>
    </div>
  );
};
