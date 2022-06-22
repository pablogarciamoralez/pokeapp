import React from 'react'
import {Link} from 'react-router-dom'
// import Header from '../header/Header'
import image from '../../images/pokemon-header.jpg'
import '../landingPage/landingPage.css'

export default function LandingPage() {
    return (
        <div className='backgroundLanding'>
            <Link to ='/home' className='linkHome'></Link>
            <div className='imgLanding'>
                <h1 className='titleLanding'>POKEAPP</h1>
                {/* <img src={image} alt="landing pokemon"  /> */}
            </div>
            
        </div>
    )
}