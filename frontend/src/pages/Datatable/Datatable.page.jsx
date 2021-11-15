import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import axios from 'axios'
import './Datatable.css'

const DatatablePage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/recipes').then(response => {
      setData(response.data)
    })
  }, [])

  const columns = [
    {
      field: 'name',
      label: 'Name',
      width: 20,
    },
    {
      field: 'description',
      label: 'Description',
      width: 20,
    },
    {
      field: 'type',
      label: 'Type',
      width: 20,
    },
    {
      field: 'preptime',
      label: 'Prep Time',
      width: 5,
    },
    {
      field: 'cooktime',
      label: 'Cook Time',
      width: 5,
    },
    {
      field: 'steps',
      label: 'Steps',
      width: 50,
    },
    {
      field: 'cousine',
      label: 'Cousine',
      width: 15,
    },
    {
      field: 'ingredientname',
      label: 'Ingredient Name',
      width: 15,
    },
    {
      field: 'ingredientamount',
      label: 'Ingredient Amount',
      width: 5,
    },
    {
      field: 'servings',
      label: 'Servings',
      width: 5,
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
      <div className="datatable-table-container">
        <div className="datatable-table">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={{ columns: columns, rows: data }}
            searchTop
            scrollY
            maxHeight="500px"
            searchBottom={false}
          />
        </div>
      </div>
    </div>
  )
}

export default DatatablePage
