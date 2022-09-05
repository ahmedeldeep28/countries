import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CardCountry({ data }) {
  let { flags, name, region, capital,fifa, population } = data
  return (
    <div className='cardCountry'>
      <div className="cardCountry__img">
        <img width="100%" height="100%" src={`${flags.svg}`} alt="alt" />
      </div>
      <div className="cardCountry__content p-3 rounded-4">
        <h2 className='Country__name'>{name.common}</h2>
        <ul className='cardCountry__info'>
          <li>
            <span className="key me-2">population:</span>
            <span className="value">{population}</span>
          </li>
          <li>
            <span className="key me-2">region:</span>
            <span className="value">{region}</span>
          </li>
          <li>
            <span className="key me-2">capital:</span>
            <span className="value">{capital}</span>
          </li>
        </ul>
        <Link href={`/name/${name.common}`}>
          <a href={`/name/${name.common}`} className='btn'>
            more detalis
          </a>
        </Link>
      </div>
    </div>
  )
}

export default CardCountry