import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { json2csvAsync } from 'json-2-csv'
import './Datatable.css'

const DatatablePage = () => {
  const [data, setData] = useState([])
  const [shownData, setShownData] = useState([])
  const [filterForm, setFilterForm] = useState({
    column: '',
    word: '',
  })

  useEffect(() => {
    axios.get('http://localhost:3000/recipes').then(response => {
      setData(response.data)
      setShownData(response.data)
    })
  }, [])

  const downloadObjectAsJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(shownData))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'recipes.json')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const downloadObjectAsCsv = async () => {
    const csvShownData = await json2csvAsync(shownData)
    const dataStr =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(csvShownData))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'recipes.csv')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleFilterColumnChange = event => {
    setFilterForm({ ...filterForm, column: event.target.value })
  }

  const handleFilterWordChange = event => {
    setFilterForm({ ...filterForm, word: event.target.value })
  }

  const filterData = event => {
    if (filterForm.word === '') {
      return
    }

    if (filterForm.column === 'all' || filterForm.column === '') {
      if (isNaN(filterForm.word)) {
        setShownData(
          data.filter(
            value =>
              value.name.indexOf(filterForm.word) >= 0 ||
              value.cousine.indexOf(filterForm.word) >= 0 ||
              value.type.indexOf(filterForm.word) >= 0 ||
              value.ingredientname.indexOf(filterForm.word) >= 0 ||
              value.ingredientamount.indexOf(filterForm.word) >= 0
          )
        )
      } else {
        setShownData(
          data.filter(
            value =>
              value.name.indexOf(filterForm.word) >= 0 ||
              value.cousine.indexOf(filterForm.word) >= 0 ||
              value.type.indexOf(filterForm.word) >= 0 ||
              value.ingredientname.indexOf(filterForm.word) >= 0 ||
              value.ingredientamount.indexOf(filterForm.word) >= 0 ||
              value.preptime === parseInt(filterForm.word) ||
              value.cooktime === parseInt(filterForm.word) ||
              value.servings === parseInt(filterForm.word)
          )
        )
      }
    } else if (
      [
        'name',
        'cousine',
        'type',
        'ingredientname',
        'ingredientamount',
      ].includes(filterForm.column)
    ) {
      setShownData(
        data.filter(
          value => value[filterForm.column].indexOf(filterForm.word) >= 0
        )
      )
    } else {
      setShownData(
        data.filter(
          value => value[filterForm.column] === parseInt(filterForm.word)
        )
      )
    }
  }

  const columns = [
    {
      field: 'name',
      label: 'Name',
      width: 40,
    },
    {
      field: 'description',
      label: 'Description',
      width: 150,
    },
    {
      field: 'type',
      label: 'Type',
      width: 50,
    },
    {
      field: 'preptime',
      label: 'Prep Time',
      width: 30,
    },
    {
      field: 'cooktime',
      label: 'Cook Time',
      width: 30,
    },
    {
      field: 'steps',
      label: 'Steps',
      width: 300,
    },
    {
      field: 'cousine',
      label: 'Cousine',
      width: 50,
    },
    {
      field: 'ingredientname',
      label: 'Ingredient Name',
      width: 50,
    },
    {
      field: 'ingredientamount',
      label: 'Ingredient Amount',
      width: 30,
    },
    {
      field: 'servings',
      label: 'Servings',
      width: 30,
    },
  ]

  return (
    <div className="datatable-page-container">
      <div className="datatable-content-container">
        <div className="datatable-title">Welcome to Dataset view!</div>
        <div className="datatable-desc">
          Here you can look through data and/or filter it.{' '}
          <Link style={{ textDecoration: 'none', color: '#f8403a' }} to="/">
            Go back.
          </Link>
        </div>
      </div>
      <div className="datatable-filter-container">
        <div className="datatable-filter-keyword-input">
          <TextField
            label="Keyword"
            variant="standard"
            value={filterForm.word}
            onChange={handleFilterWordChange}
          />
        </div>
        <div className="datatable-filter-select-container">
          <FormControl className="datatable-filter-select-form-control">
            <InputLabel id="column-label">Column</InputLabel>
            <Select
              labelId="column-label"
              label="Column"
              value={filterForm.column}
              onChange={handleFilterColumnChange}>
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'preptime'}>Prep Time</MenuItem>
              <MenuItem value={'cooktime'}>Cook Time</MenuItem>
              <MenuItem value={'type'}>Type</MenuItem>
              <MenuItem value={'cousine'}>Cousine</MenuItem>
              <MenuItem value={'ingredientname'}>Ingredient Name</MenuItem>
              <MenuItem value={'ingredientamount'}>Ingredient Amount</MenuItem>
              <MenuItem value={'servings'}>Servings</MenuItem>
              <MenuItem value={'all'}>All columns</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="datatable-filter-button" onClick={filterData}>
          Search
        </div>
        <div
          className="datatable-filtered-download-button"
          onClick={downloadObjectAsJson}>
          JSON
        </div>
        <div
          className="datatable-filtered-download-button"
          onClick={downloadObjectAsCsv}>
          CSV
        </div>
      </div>
      <div className="datatable-table-container">
        <div className="datatable-table">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={{ columns: columns, rows: shownData }}
            scrollY
            searching={false}
            maxHeight="400px"
          />
        </div>
      </div>
    </div>
  )
}

export default DatatablePage
