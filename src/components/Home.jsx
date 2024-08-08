import Carddisplay from "./Carddisplay"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import Stat from "./Stat"
export default function Home() {
    return (
<>

<div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello, Coders</h1>
      <p className="mb-5">
        Documenting my coding experiences and solutions to real-world problems.
      </p>
      <Link onClick={() => window.scrollTo(0, 500)} className="btn btn-primary">Get Started</Link>
    </div>
  </div>
</div>
<br>
</br>
<Link to="/getpost" className="text-2xl underline p-5 font-mono font-bold">Recent Articles ....</Link>

<Carddisplay />
{/* <Stat /> */}
<Footer />

</>

    )
}