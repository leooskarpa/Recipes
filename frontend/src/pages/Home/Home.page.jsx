import './Home.css'
import IntroImage from '../../assets/images/public-page-intro-image.jpg'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="welcome-container">
        <div className="welcome-image-container">
          <div className="welcome-content">
            <div className="welcome-text">Welcome to Recipes Dataset</div>
            <Link className="welcome-button" to="datatable">
              Go to Dataset!
            </Link>
          </div>
        </div>
      </div>
      <div className="introduction-container">
        <div className="introduction-content-container">
          <h1>Recipes</h1>
          <p>
            This is a project that is being done as part of a course at the
            college. The language in which is the data is English. In the
            database there are three tables:{' '}
            <span className="bolded-text-span">Country</span>,{' '}
            <span className="bolded-text-span">Ingredient</span> and{' '}
            <span className="bolded-text-span">Recipe</span>.
          </p>
          <div className="lists-container">
            <ul>
              <li style={{ marginBottom: '0.5rem' }}>Country</li>
              <ul>
                <li>id</li>
                <li>name</li>
              </ul>
            </ul>
            <ul>
              <li style={{ marginBottom: '0.5rem' }}>Ingredient:</li>
              <ul>
                <li>id</li>
                <li>ingredient name</li>
                <li>ingredient amount</li>
                <li>recipe id</li>
              </ul>
            </ul>
            <ul>
              <li style={{ marginBottom: '0.5rem' }}>Recipe</li>
              <ul>
                <li>id</li>
                <li>name</li>
                <li>steps</li>
                <li>preptime</li>
                <li>cooktime</li>
                <li>servings</li>
                <li>type</li>
                <li>description</li>
                <li>country id</li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="introduction-image-container">
          <img className="introduction-image" src={IntroImage} alt="Intro" />
        </div>
      </div>
      <div className="download-container">
        <div className="download-text">Download Dataset</div>
        <div className="download-buttons-container">
          <div>
            <a
              className="download-button"
              href="/files/recipes.json"
              download="Recipes.json">
              JSON
            </a>
          </div>
          <div>
            <a
              className="download-button"
              href="/files/recipes.csv"
              download="Recipes.csv">
              CSV
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
