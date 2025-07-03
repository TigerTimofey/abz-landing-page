import './welcomeBanner.scss'
import heroImg from '../../assets/pexels-alexandr-podvalny-1227513.jpeg'

function WelcomeBanner() {
  return (
    <section className="welcome-section">
      <img src={heroImg} alt="Hero background" className="welcome-section__bg" />
      <div className="welcome-section__content">
        <h1 className="welcome-section__title">
          Test assignment for front-end developer
        </h1>
        <p className="welcome-section__desc">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <div>
          <button className="button-yellow welcome-section__btn">Sign up</button>
        </div>
      </div>
    </section>
  )
}

export default WelcomeBanner
