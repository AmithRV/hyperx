import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import React from 'react';

import '@/styles/stock-filter/items-table.css';

function ItemsTable({
  headers = [],
  selectedHeaders = [],
  csvData = [],
  filteredData = [],
  filterKey = {},
  toggleHeader,
  setFilterKey,
  isExpanded = false,
  setIsExpanded,
}) {
  return (
    <div className={`${isExpanded ? 'w-100' : 'w-75'} items-table`}>
      <Stack direction="horizontal" className="my-4" gap={2}>
        <div>
          {headers.map((header, index) => (
            <Badge
              pill
              bg={selectedHeaders.includes(header) ? 'primary' : 'secondary'}
              key={index}
              onClick={() => {
                toggleHeader(header, index);
              }}
              onDoubleClick={() => {
                if (filterKey?.high) {
                  setFilterKey({ ...filterKey, ltp: header });
                } else {
                  setFilterKey({ ...filterKey, high: header });
                }
              }}
              style={{ cursor: 'pointer' }}
              className="mx-1 my-1"
            >
              {header}
            </Badge>
          ))}
        </div>

        <div>
          {selectedHeaders.length > 0 && !isExpanded && (
            <Badge
              bg="danger"
              onClick={() => {
                setIsExpanded(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              ⛶
            </Badge>
          )}
          {selectedHeaders.length > 0 && isExpanded && (
            <Badge
              bg="danger"
              onClick={() => {
                setIsExpanded(false);
              }}
              style={{ cursor: 'pointer' }}
            >
              ↕
            </Badge>
          )}
        </div>
      </Stack>

      <div className="table-items-wrap">
        <Table
          className={`table table-dark table-striped ${
            csvData.length === 0 ? 'd-none' : ''
          }`}
        >
          <thead>
            <tr>
              <th>#</th>
              {selectedHeaders.map((e, index) => (
                <th key={index}>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {selectedHeaders.map((e, i) => (
                  <td key={i}>{data[e]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ItemsTable;
