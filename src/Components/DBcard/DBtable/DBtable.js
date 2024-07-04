import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

const mapping = {
    "detail":"details",
    "food":"food",
    "food_category":"food_category",
    "food_ordered":"food_ordered",
    "ingredient":"ingredient",
    "order":"orders",
    "user":"users",
    "restaurant":"restaurants",
    "permission":"permission"
};

const DBtable = ({ tableName }) => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData(tableName);
  }, [tableName]);

  const fetchData = (table) => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${mapping[table]}/`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        setIsLoading(false);

        // Determine unique column names
        const columnSet = new Set();
        data.forEach((row) => {
          Object.keys(row).forEach((key) => {
            columnSet.add(key);
          });
        });
        const uniqueColumns = Array.from(columnSet);
        setColumns(uniqueColumns);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  const deleteRow = (id, index) => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${mapping[tableName]}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        setIsLoading(false);
      });
  };

  const renderCell = (value) => {
    if (typeof value === 'object' && value !== null) {

      return (
        <div className="flex flex-col">
          {Object.entries(value).map(([key, val]) => (
          typeof val === 'object' ? (
            <div className="flex flex-col border-black border-2 m-1 rounded">
            {Object.entries(val).map(([subKey, subVal]) => (
              <p key={`${key}-${subKey}`} className="text-sm text-gray-500">{`${subKey}: ${subVal}`}</p>
            ))}
            </div>
          ) : (
            <p key={key} className="text-sm text-gray-500">{`${key}: ${val}`}</p>
          )
        ))}
        </div>
      );
    }
    return <p className="text-sm text-gray-500">{value}</p>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {renderCell(row[column])}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => deleteRow(row.id, index)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DBtable.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default DBtable;
