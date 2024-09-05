import AboutPortrait from '../../assets/AboutPortrait.jpg'
const About = () => {
    return (
        <div className='d-flex flex-column w-100 about'>
            <span className='d-flex align-items-center'>
                <img className='aboutPortrait rounded-circle border border-2' src={AboutPortrait} alt="" />
                <div className='ms-4 pt-2'>
                    <h6 className='rounded px-2 py-1 text-white mb-1' style={{background: "#4d5c46"}}>Brandon Durand</h6>
                    <h6 >PTCO</h6>
                    <p className='fs-6 fw-bold'>Website development</p>
                </div>
            </span>
            <div className='d-flex flex-column'>
                <h6 className='me-auto mt-2'><b style={{color: "#4d5c46", marginRight: ".15rem"}}>Shop</b><b className="p-1 bg-dark  text-white border border-1 rounded">N</b><b style={{color: "#bd7c71", marginLeft: ".15rem"}}>Shipit</b></h6>
                <p className='text-start mt-2 fs-6'>
                    <b className='text-black'>ShopNShipit</b> is a website for shopping for <b style={{color: "#4d5c46"}}>interesting</b>, <b style={{color: "#4d5c46"}}>intuitive</b> and <b style={{color: "#4d5c46"}}>essential</b> products, for use and consumption. 
                    Browse our inventory, with a <b style={{color: "#4d5c46"}}>responsive</b> and <b style={{color: "#4d5c46"}}>ease of use U/I</b>, allowing for filtering, to ensure your looking at products you want.
                    <b style={{color: "#4d5c46"}}> Manage</b> and <b style={{color: "#4d5c46"}}>keep track</b> of your orders all within the site. Hope you find what your looking for and <b style={{color: "#4d5c46"}}>shop N ship it</b>  right to your <b style={{color: "#4d5c46"}}>door! <i class="fa-solid fa-door-open"></i></b>
                </p>
                <p className="mx-auto fw-bold fs-6 mb-5 copyrightAbout">&copy; <small>Copyright of PTCO</small></p>
            </div>
        </div>
    )
}

export default About;