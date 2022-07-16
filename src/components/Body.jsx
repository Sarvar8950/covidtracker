import React from 'react'
import "./Style.css"

export default function Body() {
    const [countries, setcountries] = React.useState([])
    const [cities, setcities] = React.useState([])
    const [data, setdata] = React.useState([])


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fa50420015mshfee4693f3627cbap126828jsne63bdec41c23',
            'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
        }
    };
    React.useEffect(() => {
        // // get all countries
        fetch('https://covid-19-statistics.p.rapidapi.com/regions', options)
            .then(response => response.json())
            .then(response => setcountries([...response.data]))
            .catch(err => console.error(err));
    }, [])

    function findallcities(e) {
        // console.log(e)
        // e.preventDefault()
        const options2 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fa50420015mshfee4693f3627cbap126828jsne63bdec41c23',
                'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
            }
        };

        fetch(`https://covid-19-statistics.p.rapidapi.com/provinces?iso=${e}`, options2)
            .then(response => response.json())
            .then(response => setcities([...response.data]))
            .catch(err => console.error(err));
    }
    function finddataofcity(e) {
        // console.log(e)
        var a = e.split(",")
        // console.log(a)
        const options3 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fa50420015mshfee4693f3627cbap126828jsne63bdec41c23',
                'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
            }
        };

        fetch(`https://covid-19-statistics.p.rapidapi.com/reports?q=${a[0]}%20${a[1]}`, options3)
            .then(response => response.json())
            .then(response => setdata(response.data))
            .catch(err => console.error(err));

    }


    return (
        <div>
            <h1>Covid Tracker</h1>
            <div className="inputs">
                <select name="country" id="country" onChange={e => findallcities(e.target.value)}>
                    <option value="">Country</option>
                    {
                        countries.map((ele) => {
                            return (
                                <option key={ele.iso + (Math.random() * 10)} value={ele.iso}>{ele.name}</option>
                            )
                        })
                    }
                </select>
                <select name="city" id="city" onChange={e => finddataofcity(e.target.value)}>
                    <option value="">State</option>
                    {
                        cities.map((ele) => {
                            return (
                                <option key={ele.iso + (Math.random() * 10)} value={[ele.iso, ele.province.length > 0 ? ele.province : ele.name]}>{ele.province.length > 0 ? ele.province : ele.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>City</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data[0]?.region.name}</td>
                            <td>{data[0]?.region.province.length > 0 ? data[0]?.region.province : data[0]?.region.name}</td>
                            <td>{data[0]?.confirmed}</td>
                            <td >{data[0]?.active}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
