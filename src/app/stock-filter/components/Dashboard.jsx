'use client';

import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import numeral from 'numeral';
import Papa from 'papaparse';

import Layout from '@/app/stock-filter/components/layouts/Layout';
import '@/styles/stock-filter/dashboard.css';

function Dashboard() {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterValue, setFilterValue] = useState(0);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterKey, setFilterKey] = useState({ high: '', ltp: '' });

  const handleFileUpload = (event) => {
    setFilterKey({ high: '', ltp: '' });
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const headers = Object.keys(result.data[0]) || {};
          setHeaders(headers);
          setSelectedHeaders(headers);
          setCsvData(result.data);
          setFilteredData(result.data);
        },
        error: (error) => {
          console.error('Error parsing the CSV file:', error);
        },
      });
    }
  };

  const toggleHeader = (header, index) => {
    if (selectedHeaders.includes(header)) {
      setSelectedHeaders((prevArray) =>
        prevArray.filter((item) => item !== header)
      );
    } else {
      setSelectedHeaders((prevArray) => [
        ...prevArray.slice(0, index),
        header,
        ...prevArray.slice(index),
      ]);
    }
  };

  const changeFrom52WH = (high, ltp) => {
    const cleanedNumberHigh = numeral(high).value();
    const cleanedNumberLtp = numeral(ltp).value();

    if (cleanedNumberHigh && cleanedNumberLtp) {
      const percentageChange =
        ((cleanedNumberLtp - cleanedNumberHigh) / cleanedNumberHigh) * 100;
      return parseInt(percentageChange, 10).toFixed(2);
    }
  };

  useEffect(() => {
    if (isFilterApplied) {
      const data = csvData.filter(
        (e) =>
          changeFrom52WH(e[filterKey?.high], e[filterKey?.ltp]) <=
          parseInt(filterValue, 10)
      );
      setFilteredData(data);
    } else {
      setFilteredData(csvData);
    }
  }, [csvData, filterValue, isFilterApplied, filterKey]);

  return (
    <Layout>
      <div className="dashboard-wrap my-4 mx-4">
        <div className="dashboard-section-1">
          <div className="w-50 h-100" id="section-8">
            <Form.Group controlId="formFile" className="mb-4 w-50">
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </Form.Group>

            <Form.Group style={{ width: '300px' }}>
              <Form.Label htmlFor="basic-url">Difference</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">%</InputGroup.Text>
                <Form.Control
                  placeholder="30"
                  max={100}
                  min={-100}
                  type="number"
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                  }}
                />
              </InputGroup>
              <Badge
                bg={isFilterApplied ? 'info' : 'danger'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsFilterApplied(!isFilterApplied);
                }}
              >
                {isFilterApplied ? 'Clear Filter' : 'Apply Filter'}
              </Badge>
              <Badge
                bg="warning"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsFilterApplied(false);
                  setFilterKey({ high: '', ltp: '' });
                  setFilterValue(0);
                }}
                className="mx-4 text-black"
              >
                Reset
              </Badge>
            </Form.Group>
          </div>
          <div className="w-50 h-100 ml-4" id="section-9 ">
            <ListGroup className="mx-4" style={{ width: '50%' }}>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                Total Items
                <Badge bg="primary" pill>
                  {csvData?.length}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                Filtered Result
                <Badge bg="primary" pill>
                  {filteredData?.length}
                </Badge>
              </ListGroup.Item>
              {filterKey?.high && (
                <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                  52Week High Key
                  <Badge bg="danger" pill>
                    {filterKey?.high}
                  </Badge>
                </ListGroup.Item>
              )}
              {filterKey?.ltp && (
                <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                  Ltp Key
                  <Badge bg="danger" pill>
                    {filterKey?.ltp}
                  </Badge>
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
        </div>

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
              <th>Δ 52WH</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {selectedHeaders.map((e, i) => (
                  <td key={i}>{data[e]}</td>
                ))}
                <td>
                  {changeFrom52WH(data[filterKey?.high], data[filterKey?.ltp])}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}

export default Dashboard;
