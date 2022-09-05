import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image'

let Name = ({ country }) => {
    let router = useRouter()
    let { flags, name, region, capital, population, subregion, startOfWeek, cca2, currencies, languages, borders } = country[0]
    let langName = "";
    for (const lang in languages) {
        langName += `${languages[lang]} `
    }
    if (router.isFallback) {
        <h1>Data is loading</h1>;
    }

    return (
        <div className='container'>
            <Link href={`/`}>
                <a className='btn my-5'>
                    back
                </a>
            </Link>
            {name.common != "Israel" ?
                <div className="row justify-content-between">
                    <div className="col-md-5">
                        <img width="100%" height="100%" src={`${flags.svg}`} alt="alt" />
                    </div>
                    <div className="col-md-6">
                        <h1>{name.common}</h1>
                        <div className="row">
                            <div className="col-md-6">
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
                                        <span className="key me-2">sub region:</span>
                                        <span className="value">{subregion}</span>
                                    </li>
                                    <li>
                                        <span className="key me-2">capital:</span>
                                        <span className="value">{capital}</span>
                                    </li>

                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className='cardCountry__info'>

                                    <li>
                                        <span className="key me-2">top level domain:</span>
                                        <span className="value">.{cca2}</span>
                                    </li>
                                    <li>
                                        <span className="key me-2">currencies:</span>
                                        <span className="value">{currencies && currencies[Object.keys(currencies)[0]].name}</span>
                                    </li>
                                    <li>
                                        <span className="key me-2">languages:</span>
                                        <span className="value">{langName}</span>
                                    </li>
                                    <li>
                                        <span className="key me-2">start Of Week:</span>
                                        <span className="value">{startOfWeek}</span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="color-title text-capitalze mt-4">
                            bordr countries:
                            {borders && borders.map((el, idx) => {
                                return <span key={idx} className="btn btn-sm ms-3">{el} </span>
                            })}

                        </div>
                    </div>
                </div>
                :
                <div className='my-2'>
                    <Image src="/image.jpg"
                        alt="Picture of the author"
                        width="800"
                        height="500" />
                </div>
            }
        </div>
    )
}

export default Name


export async function getStaticPaths() {
    let res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json();
    let paths = data.map(country => {
        return {
            params: { name: country.name.common }
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    let { name } = context.params;
    let res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    const data = await res.json();
    return {
        props: {
            country: data
        }
    }
}