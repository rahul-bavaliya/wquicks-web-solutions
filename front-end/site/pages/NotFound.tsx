import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'

export default function NotFound() {
  return (
    <PageIntro title="This page isn't here.">
      <p>The link may be old or mistyped. Try the home page or our services.</p>
      <p className="intro-jump">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </p>
    </PageIntro>
  )
}
