import { Typography, Button, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Nav as NavItem, Navbar, NavDropdown } from 'react-bootstrap'
import "./Nav.css"


const Nav = () => {
    return (
        <div className="outside">
            <Link to="/" style={{textDecoration: 'none'}}><Typography variant='h2' style={{paddingTop: '.2em', paddingBottom: '.2em'}} className="header">TrigTrainer</Typography></Link>
            {/* <div> */}
                {/* <Link to="/" className="link"><Typography className='link' style={{fontWeight: 'bold', fontSize: 18}}>Home</Typography ></Link> */}
                {/* <Link to="/test" className="link"><Typography className='link' style={{fontWeight: 'bold', fontSize: 18}}>Test Yourself 🧠</Typography ></Link> */}
                {/* <Link to="/profile" className="link"><Typography className='link'>Profile</Typography ></Link> */}
                {/* <Link to="/signup" className="link"><Typography className='link' >Sign Up/Log In</Typography ></Link> */}
            {/* </div> */}
        </div>
        
    )
}



export default Nav