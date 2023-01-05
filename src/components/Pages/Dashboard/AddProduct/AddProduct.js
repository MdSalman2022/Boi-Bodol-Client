import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import Location from '../../../Shared/Location/Location';

const AddProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { user, categories } = useContext(AuthContext)

    console.log(categories);


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
            .catch(err => console.log(err))
    }, [])

    let [districts, setDistricts] = useState([])


    useEffect(() => {
        divisions &&
            fetch(`${process.env.REACT_APP_SERVER_LINK}/districts/${state?.division}`)
                .then(res => res.json())
                .then(data => setDistricts(data))
                .catch(err => console.log(err))
    }, [state?.division])

    let [upazilas, setUpazilas] = useState([])

    useEffect(() => {
        districts &&
            fetch(`${process.env.REACT_APP_SERVER_LINK}/upazilas/${state?.district}`)
                .then(res => res.json())
                .then(data => setUpazilas(data))
                .catch(err => console.log(err))
    }, [state?.district])

    const [division, setDivision] = useState('')
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')


    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleProductSubmit = data => {

        divisions = divisions.filter(division => division.division_id === state.division)

        districts = districts.filter(district => district.district_id === state.district)



        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgUpload => {
                if (imgUpload.success) {
                    const product = {
                        name: data.name,
                        sname: data.sname,
                        price: parseInt(data.price),
                        condition: data.condition,
                        category: data.category,
                        publication: data.publication,
                        edition: data.edition,
                        authenticity: data.authenticity,
                        nagotiable: data.nagotiable,
                        courier: data.courier,
                        phoneNo: data.phoneNo,
                        description: data.description,
                        email: data.email,
                        img: imgUpload.data.url,
                        sold: false,
                        trending: false,
                        featured: false,
                        urgent: false,
                        division: divisions[0]?.division,
                        district: districts[0]?.District,
                        upazila: state.upazila,
                        dateAdded: new Date(),
                        date: new Date().toLocaleString(),
                        // minute: new Date().getMinutes(),
                        // hour: new Date().getHours(),
                        // day: new Date().getDate(),
                        // month: new Date().getMonth() + 1,
                        // year: new Date().getFullYear(),

                    }
                    console.log(product);
                    fetch(`${process.env.REACT_APP_SERVER_LINK}/books`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        // headers: {
                        //     'content-type': 'application/json',
                        //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                        // },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${product.name} is added successfully`)
                            navigate('/dashboard/myproducts')
                        }
                        )
                }
            })

    }





    return (
        <div className=' scrollbar-hide'>
            <div className="p-8 space-y-3 rounded-xl bg-base-200 mx-auto ">
                <h1 className="text-3xl font-semibold text-center">Add A Product</h1>
                <form onSubmit={handleSubmit(handleProductSubmit)} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid grid grid-cols-2   scrollbar-hide">

                    <div className=" text-sm mt-5">
                        <label htmlFor="name" className="block ">Book Name</label>
                        <input type="text"
                            {...register("name",
                                { required: "Name is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className=' text-sm mt-5'>
                        <label htmlFor="images" className="block label-text">Book Images</label>

                        <input type="file"
                            {...register("image",
                                { required: "Photo is required", })}
                            className="file-input file:text-secondary w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>


                    <div className=' text-sm'>
                        <label htmlFor="publication" className="block ">Book Publication</label>
                        <input type="text"
                            {...register("publication")}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.publication && <p className='text-red-500'>{errors.publication.message}</p>}

                    </div>
                    <div className=' text-sm'>
                        <label htmlFor="edition" className="block ">Book Edition</label>
                        <input type="text"
                            {...register("edition")}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.edition && <p className='text-red-500'>{errors.edition.message}</p>}
                    </div>

                    <div className=' text-sm'>
                        <label htmlFor="authenticity" className="block ">Book Category</label>
                        <select className="select select-primary w-full max-w-xs" {...register("category", { required: true })}>
                            {
                                categories.map(category => <option value={category.category} key={category._id}>{category.category}</option>)
                            }
                        </select>
                    </div>
                    <div className=' text-sm'>
                        <label htmlFor="authenticity" className="block ">Authenticity</label>
                        <select className="select select-primary w-full max-w-xs" {...register("authenticity", { required: true })}>
                            <option value="original">Orginal</option>
                            <option value="copy">Copy</option>
                        </select>
                    </div>

                    <div className=" text-sm">
                        <label htmlFor="price" className="block ">Price</label>
                        <input type="number"
                            {...register("price",
                                { required: "Price is required", })}
                            className="input input-bordered w-full max-w-xs" />

                        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                        <label className="label cursor-pointer w-32" >
                            <span className="label-text">Nagotiable</span>
                            <input className="checkbox checkbox-primary" type="checkbox" {...register("nagotiable")} />
                        </label>

                    </div>

                    <div className=' text-sm'>
                        <label htmlFor="condition" className="block ">Product Condition</label>
                        <select className="select select-primary w-full max-w-xs" defaultValue="Used" {...register("condition", { required: true })}>
                            <option value="used" >Used</option>
                            <option value="new">New</option>
                        </select>
                    </div>
                    <div className=" text-sm">
                        <label htmlFor="phoneNo" className="block ">Contact Number</label>
                        <input type="text"
                            {...register("phoneNo",
                                { required: "Contact Number is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.phoneNo && <p className='text-red-500'>{errors.phoneNo.message}</p>}
                    </div>

                    <div className=" text-sm">

                        <label htmlFor="division" className={`block ${state.division ? "hidden" : ''}`}>Division</label>
                        <select defaultValue={""} className={`select select-primary w-auto max-w-xs ${state.division ? "hidden" : ''}`} name="division" onChange={async (e) => await dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value }, })} required>
                            <option disabled hidden value="">Select a Division</option>
                            {divisions &&
                                divisions?.map(division => <option key={division.division_id} value={division.division_id}>{division.division}</option>)
                            }
                        </select>


                        <label htmlFor="districts" className={`block ${!state.division || state.district ? "hidden" : ''}`}>Districts</label>
                        <select defaultValue={""} className={`select select-primary w-auto max-w-xs ${!state.division || state.district ? "hidden" : ''}`} name="district" onChange={async (e) => await dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value }, })} required>
                            <option disabled hidden value="">Select a District</option>
                            {districts &&
                                districts?.map(district => <option key={district._id} value={district.district_id}>{district.District}</option>)
                            }
                        </select>


                        <label htmlFor="upazila" className={`block ${!state.district ? "hidden" : ''}`}>Upazila</label>
                        <select defaultValue={""} className={`select select-primary w-auto max-w-xs ${!state.district ? "hidden" : ''}`} name="upazila"
                            onChange={async (e) => await dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value }, })} required>
                            <option disabled hidden value="">Select a Upazila</option>

                            {upazilas &&
                                upazilas?.map(upazila => <option key={upazila._id} value={upazila.Upazilla}>{upazila.Upazilla}</option>)
                            }
                        </select>
                    </div>
                    <div className=" text-sm">
                        <label htmlFor="description" className="block ">Description</label>
                        {/* <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea> */}
                        <textarea type="text"
                            {...register("description",
                                { required: "Location is required", })}
                            className="textarea textarea-bordered w-full max-w-xs" ></textarea>
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                    </div>

                    <div className=" text-sm">
                        <label htmlFor="sname" className="block ">Seller Name</label>
                        <input type="text"
                            {...register("sname",
                                { required: "Name is required", })}
                            className="input input-bordered w-full max-w-xs" defaultValue={user?.displayName} readOnly />
                        {errors.sname && <p className='text-red-500'>{errors.sname.message}</p>}
                    </div>
                    <div className=" text-sm">
                        <label htmlFor="email" className="block ">Email Address</label>
                        <input type="email"
                            {...register("email",
                                { required: "Email is required" })}
                            className="input input-bordered w-full max-w-xs " defaultValue={user?.email} readOnly />
                        {/* {errors?.email && <p className='text-red-500'>{errors?.email.message}</p>} */}
                    </div>
                    <div className="form-control w-24">
                        <label className="label cursor-pointer">
                            <span className="label-text">Courier</span>
                            <input className="checkbox checkbox-primary" type="checkbox" {...register("courier")} />
                        </label>
                    </div>

                    <input className='btn btn-secondary text-white  text-secondary w-full max-w-xs mt-4' value="Submit" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;