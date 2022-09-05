import Head from 'next/head'
import { useState } from 'react';
import CardCountry from './../../components/CardCountry';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Region({ data }) {

    let [country, setCountry] = useState(data);

    const router = useRouter()
    let regionPage = router.query.region


    const listCountry = country.map((item, idx) => {
        return (
            <div className="col-md-4" key={idx}>
                {item.name.common != "Israel" ? <CardCountry data={item} /> : null}
            </div>
        )
    })

    let filtertionCountry = (e) => {
        let filter = data.filter(el => {
            return el.name.common.includes(e.target.value)
        })
        setCountry(filter)
    }
    return (
        <div className="app">
            <div className='container'>
                <div className="row g-2 mt-4 justify-content-between">
                    <div className="col-md-4">
                        <input className='input' type="text" onChange={filtertionCountry} name='search' placeholder='search for a country..' />
                    </div>
                    <div className="col-md-3">
                        <div className='dropdown'>
                            <button className="dropdown__text">filter by region {regionPage}</button>
                            <ul className="dropdown__menu">
                                <li className="dropdown__item">
                                    <Link href="/">
                                        <a>
                                            all
                                        </a>
                                    </Link>
                                </li>
                                <li className="dropdown__item">
                                    <Link href="/region/europe">
                                        <a>
                                            europe
                                        </a>
                                    </Link>
                                </li>
                                <li className="dropdown__item">
                                    <Link href="/region/americas">
                                        <a>
                                            americas
                                        </a>
                                    </Link>
                                </li>
                                <li className="dropdown__item">
                                    <Link href="/region/asia">
                                        <a>
                                            asia
                                        </a>
                                    </Link>
                                </li>
                                <li className="dropdown__item">
                                    <Link href="/region/africa">
                                        <a>
                                            africa
                                        </a>
                                    </Link>
                                </li>
                                <li className="dropdown__item">
                                    <Link href="/region/oceania">
                                        <a>
                                            oceania
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row g-3 mt-4">
                    {listCountry}

                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {

    return {
        paths: [
            { params: { region: 'europe' } },
            { params: { region: 'americas' } },
            { params: { region: 'asia' } },
            { params: { region: 'africa' } },
            { params: { region: 'oceania' } },
        ],
        fallback: false,
    }
}

export async function getStaticProps(context) {
    let { region } = context.params
    let res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
    const data = await res.json();
    return {
        props: {
            data,
        }
    }
}

