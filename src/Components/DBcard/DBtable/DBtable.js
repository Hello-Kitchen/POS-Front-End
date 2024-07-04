import React, { useEffect, useState } from "react";

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

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${mapping[tableName]}/`)
        .then(response => response.json())
        .then(data => {
          setTableData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }, [tableName]);

    const renderCell = (value) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <div className="flex flex-col">
            {Object.entries(value).map(([key, val]) => (
              <p key={key} className="text-sm text-gray-500">{`${key}: ${val}`}</p>
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
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {Object.keys(tableData[0] || {}).map((key) => (
                <th key={key} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, subIndex) => (
                  <td key={subIndex} className="px-6 py-4 whitespace-nowrap">
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default DBtable;