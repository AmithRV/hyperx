'use client';

import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { CSVLink } from 'react-csv';
import numeral from 'numeral';
import Papa from 'papaparse';

import Layout from '@/app/stock-filter/components/layouts/Layout';
import '@/styles/stock-filter/dashboard.css';
import axios from 'axios';
import Link from 'next/link';
import { indices } from '../data';

function Dashboard() {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterValue, setFilterValue] = useState(0);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterKey, setFilterKey] = useState({ high: '', ltp: '' });

  const [formatedCsvData, setFormatedCsvData] = useState();

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
          setSelectedHeaders([...headers, 'delta']);
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
      const data = formatedCsvData.filter(
        (e) => e.delta <= parseInt(filterValue, 10)
      );

      setFilteredData(data);
    } else {
      setFilteredData(formatedCsvData);
    }
  }, [formatedCsvData, filterValue, isFilterApplied, filterKey]);

  useEffect(() => {
    if (filterKey.high && filterKey.ltp && csvData.length > 0) {
      const updatedData = csvData.map((item) => ({
        ...item,
        delta: changeFrom52WH(item[filterKey?.high], item[filterKey?.ltp]),
      }));
      setFormatedCsvData(updatedData);
      setFilteredData(updatedData);
    } else {
      setFormatedCsvData(csvData);
    }
  }, [filterKey, csvData]);

  return (
    <Layout>
      <div className="dashboard-wrap my-4 mx-4">
        <div className="dashboard-section-1">
          <div className="w-50 h-100" id="section-8">
            <Form.Group controlId="formFile" className="mb-4 w-50 d-flex">
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
              />

              {filteredData?.length > 0 && (
                <CSVLink
                  data={filteredData}
                  headers={selectedHeaders}
                  filename={'my-data.csv'}
                  className="btn btn-primary mx-2 px-4 py-2"
                  title=""
                >
                  Export
                </CSVLink>
              )}
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
          <div className="w-50 d-flex">
            <div className="w-50 h-100 ml-4" id="section-9 ">
              <ListGroup className="mx-4">
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
            <div className="w-50 h-100 ml-4" id="section-9 ">
              <ListGroup className="mx-4">
                {indices.map((e, index) => (
                  <ListGroup.Item
                    className="bg-dark text-white d-flex justify-content-between"
                    key={index}
                  >
                    <Link
                      href={`https://www.nseindia.com/market-data/live-equity-market?symbol=${e.indexSymbol}`}
                      className="text-white text-decoration-none w-100"
                      target="_blank"
                    >
                      {e?.index}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
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
    </Layout>
  );
}

export default Dashboard;
