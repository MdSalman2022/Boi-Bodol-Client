import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';

const Location = () => {



    const initialState = {
        division: "",
        district: "",
        upazila: ""
    }

    const reducer = (state, action) => {
        console.log(action)
        switch (action.type) {
            case "INPUT":
                return {
                    ...state,
                    [action.payload.name]: action.payload.value
                };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    let [divisions, setDivisions] = useState([])



    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/divisions`)
            .then(res => res.json())
            .then(data => setDivisions(data))
    }, [])

    let [districts, setDistricts] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/districts/${state.division}`)
            .then(res => res.json())
            .then(data => setDistricts(data))
    }, [state.division])

    let [upazilas, setUpazilas] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/upazilas/${state.district}`)
            .then(res => res.json())
            .then(data => setUpazilas(data))
    }, [state.district])

    const [division, setDivision] = useState('')
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')




    const handleLocation = (e) => {
        e.preventDefault()



        setUpazila(state?.upazila);


        divisions = divisions.filter(division => division.division_id === state.division)

        districts = districts.filter(district => district.district_id === state.district)

        let info = {

            division: divisions[0]?.division,
            district: districts[0]?.District,
            upazila: state.upazila
        }
        console.log(info);
    }




    return (
        <div className='mx-auto text-center flex justify-center'>


            <form onSubmit={handleLocation}>

                <label htmlFor="division" className={`block ${state.division ? "hidden" : ''}`}>Division</label>
                <select className={`select select - primary w - auto max - w - xs ${state.division ? "hidden" : ''}`} name="division" onChange={async (e) => await dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value }, })} required>
                    <option disabled selected hidden value="">Select an Option</option>
                    {divisions &&
                        divisions?.map(division => <option key={division.division_id} value={division.division_id}>{division.division}</option>)
                    }
                </select>


                <label htmlFor="districts" className={`block ${!state.division || state.district ? "hidden" : ''}`}>Districts</label>
                <select className={`select select - primary w - auto max - w - xs ${!state.division || state.district ? "hidden" : ''} `} name="district" onChange={async (e) => await dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value }, })} required>
                    <option disabled selected hidden value="">Select an Option</option>
                    {districts &&
                        districts?.map(district => <option key={district._id} value={district.district_id}>{district.District}</option>)
                    }
                </select>


                <label htmlFor="upazila" className={`block ${!state.district ? "hidden" : ''} `}>Upazila</label>
                <select className={`select select - primary w - auto max - w - xs ${!state.district ? "hidden" : ''} `} name="upazila"
                    onChange={async (e) => await dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value }, })} required>
                    <option disabled selected hidden value="">Select an Option</option>

                    {upazilas &&
                        upazilas?.map(upazila => <option key={upazila._id} value={upazila.Upazilla}>{upazila.Upazilla}</option>)
                    }
                </select>

                <input className='btn btn-neutral text-white w-full max-w-xs mt-4' value="Submit" type="submit" />
            </form>




        </div>
    );
};

export default Location;