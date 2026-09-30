import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function ProductCard({ data, carddelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className="relative overflow-visible rounded-lg border border-[#DCE8DE] bg-white p-3 shadow-sm transition-shadow hover:shadow-[0_10px_24px_rgba(15,23,42,0.10)]">
      <div className="absolute top-4 right-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-black hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`${
            isOpen ? "" : "hidden"
          } z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-green-500/50 w-44 absolute right-4 mt-2`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <Link to={`/admin/editProduct?id=${data._id}`}>
                <p className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                  Edit
                </p>
              </Link>
            </li>
            <li>
              <p
                onClick={() => carddelete(data._id)}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </p>
            </li>
          </ul>
        </div>
      </div>
      <img
        className="h-32 w-full rounded-lg bg-[#F4F8F5] object-contain p-3"
        src={`${API_BASE_URL}/` + data.Image}
        alt={data.title || "Scrap item"}
      />
      <div className="pt-3 leading-normal">
        <p className="text-[11px] font-bold uppercase text-[#698596]">{data.category || "Scrap"}</p>
        <h5 className="mt-1 min-h-[2.5rem] text-sm font-bold leading-snug text-gray-900 line-clamp-2">
          {data.title}
        </h5>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#E5EDE6] pt-3">
          <p className="text-lg font-bold text-[#18931D]">₹{data.price}<span className="text-xs font-medium text-gray-500">/Kg</span></p>
          <Link
            to={`/admin/editProduct?id=${data._id}`}
            className="inline-flex items-center gap-1 rounded-full bg-[#18931D] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#15801A]"
          >
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
