import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import React from 'react';

function ItemsTable({
  headers = [],
  selectedHeaders = [],
  csvData = [],
  filteredData = [],
  filterKey = {},
  toggleHeader,
  setFilterKey,
}) {
  return (
    <div className="w-75">
      <Stack direction="horizontal" className="my-4" gap={2}>
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
          >
            {header}
          </Badge>
        ))}
      </Stack>

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
  );
}

export default ItemsTable;
