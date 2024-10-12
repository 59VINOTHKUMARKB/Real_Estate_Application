import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CloudinaryUploadWidget from "../../components/UploadWidgets/UploadWidget";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PlusCircle, Image as ImageIcon, Home, DollarSign, MapPin, BedDouble, Compass, ShowerHead, Building, Zap, PawPrint, Briefcase, Maximize2, School, Bus, Utensils } from 'lucide-react';

function NewPostPage() {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        console.log(inputs);

        try {
            console.log("works1");
        
            const response = await fetch('http://localhost:8800/api/posts/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postData: {
                        title: inputs.title,
                        price: parseInt(inputs.price),
                        address: inputs.address,
                        city: inputs.city,
                        bedroom: parseInt(inputs.bedroom),
                        bathroom: parseInt(inputs.bathroom),
                        type: inputs.type,
                        property: inputs.property,
                        latitude: inputs.latitude,
                        longitude: inputs.longitude,
                        images: images,
                    },
                    postDetail: {
                        desc: value,
                        utilities: inputs.utilities,
                        pet: inputs.pet,
                        income: inputs.income,
                        size: parseInt(inputs.size),
                        school: parseInt(inputs.school),
                        bus: parseInt(inputs.bus),
                        restaurant: parseInt(inputs.restaurant),
                    },
                    userId: currentUser.id,
                }),
                credentials: 'include',
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "An error occurred");
            }
        
            const data = await response.json();
            console.log("works2");
            navigate("/" + data.id);
        } catch (err) {
            console.log("Client Error:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 overflow-y-scroll py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8">Add New Property</h1>
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Home className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="title" name="title" type="text" required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Luxurious Beachfront Villa" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="price" name="price" type="number" required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="1000000" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="address" name="address" type="text" required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="123 Luxury Lane" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <ReactQuill theme="snow" onChange={setValue} value={value} className="h-40 sm:h-48 mb-11" />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1 sm:mt-4 lg:mt-0 ">City</label>
                                    <input id="city" name="city" type="text" required className="block w-full px-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Beverly Hills" />
                                </div>
                                <div>
                                    <label htmlFor="bedroom" className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BedDouble className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="bedroom" name="bedroom" type="number" min={1} required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="5" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="bathroom" className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ShowerHead className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="bathroom" name="bathroom" type="number" min={1} required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="4" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Compass className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="latitude" name="latitude" type="text" required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="34.0522" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Compass className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="longitude" name="longitude" type="text" required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="-118.2437" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select name="type" className="block w-full pl-3 pr-10 py-2 sm:py-3 text-base sm:text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                        <option value="rent">Rent</option>
                                        <option value="buy">Buy</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                    <select name="property" className="block w-full pl-3 pr-10 py-2 sm:py-3 text-base sm:text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="condo">Condo</option>
                                        <option value="land">Land</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="utilities" className="block text-sm font-medium text-gray-700 mb-1">Utilities Policy</label>
                                    <select name="utilities" className="block w-full pl-3 pr-10 py-2 sm:py-3 text-base sm:text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                        <option value="owner">Owner is responsible</option>
                                        <option value="tenant">Tenant is responsible</option>
                                        <option value="shared">Shared</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="pet" className="block text-sm font-medium text-gray-700 mb-1">Pet Policy</label>
                                    <select name="pet" className="block w-full pl-3 pr-10 py-2 sm:py-3 text-base sm:text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                        <option value="allowed">Allowed</option>
                                        <option value="not-allowed">Not Allowed</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">Income Policy</label>
                                    <input id="income" name="income" type="text" placeholder="Income Policy" className="block w-full px-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Total Size (sqft)</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Maximize2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="size" name="size" type="number" min={0} required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="3000" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">School (distance in meters)</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <School className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="school" name="school" type="number" min={0} required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="bus" className="block text-sm font-medium text-gray-700 mb-1">Bus (distance in meters)</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Bus className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="bus" name="bus" type="number" min={0} required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="200" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-1">Restaurant (distance in meters)</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Utensils className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input id="restaurant" name="restaurant" type="number" min={0} required className="block w-full pl-10 pr-3 py-2 sm:py-3 text-base sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="300" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-4">Upload Property Images</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                                    {images.map((image, index) => (
                                        <img src={image} key={index} alt="" className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md" />
                                    ))}
                                </div>
                                <CloudinaryUploadWidget
                                    uwConfig={{
                                        cloudName: "doqyfe25u",
                                        uploadPreset: "estate",
                                        multiple: true,
                                        folder: "posts",
                                    }}
                                    setState={setImages}
                                >
                                    {({ open }) => (
                                        <button
                                            onClick={open}
                                            type="button"
                                            className="w-full sm:w-auto flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transition-all duration-200"
                                        >
                                            <ImageIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            Upload Property Images
                                        </button>
                                    )}
                                </CloudinaryUploadWidget>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transition-all duration-200">
                                    <PlusCircle className="-ml-1 mr-3 h-6 w-6" aria-hidden="true" />
                                    Add your Property
                                </button>
                            </div>
                            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPostPage;