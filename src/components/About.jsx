import abt from "../assets/abt1.png"



export default function About() {
    return(
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={abt}
      className="max-w-sm rounded-lg" />
    <div>
      <h1 className="text-5xl font-bold">Darshan Jain</h1>
      <p className="py-6">
      Hi, I’m Darshan Jain, a passionate programmer with a love for turning ideas into reality. With a keen eye for detail and a commitment to excellence, I enjoy tackling new challenges and continuously learning.
      </p>
      <a href="https://darshanjainportfolio.netlify.app/" target="_blank" className="btn btn-primary">Visit my portfolio</a>
    </div>
  </div>
</div>
    )
}