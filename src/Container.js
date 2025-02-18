import React from 'react'
import './App.css'
// import Navbar from './Navbar/Navbar'

export default function Container() {
    return (
      <div className='main div'>
        <div className='row'>
            <div className='card'>
                <div className='card-body'>
                <div className="card-1">
                        <p className="card-category">Active User<span id="ActiveUser"></span></p>
                    </div>
                     <div className="card-2">
                        <p className="card-category">Active Admin<span id="ActiveAdmin"></span></p>
                </div>
                <div className="card-3">
                        <p className="card-category">Active Admin<span id="ActiveAdmin"></span></p>
                </div>
                <div className="card-4">
                        <p className="card-category">Active Admin<span id="ActiveAdmin"></span></p>
                </div>
                </div>

            </div>

        </div>

      </div>
    )
}
