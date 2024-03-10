import React from 'react'
import four04 from '../assets/SVG-Animation-404-Page.png'
import Layout from './Layout/Layout'
import './four04.css'
export default function Four04() {
  return (
    <Layout>
      <section className='internal-page-wrapper'>
    <div className='container'>
    <div className='row h-100  align-items-center  text-center  ' >
        <div className=' col-12  mt-5  pt-5 '>
            <h1 className=' bold product-title  '> 
            The page you're looking for can't be found. 
            </h1>
            <img src={four04} alt="" />
        </div>
    </div>
    </div>
    </section>
    </Layout>
  )
}