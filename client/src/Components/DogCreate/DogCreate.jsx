import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewDog, getTemperaments } from "../../Actions/actions";


export default function DogCreate() {
    const dispatch = useDispatch()
    const newTemp = useSelector((state) => state.temperaments)
    // const dogui = useSelector((state) => state.postDog)
    const [input, setInput] = useState ({
        Name: "",
        Height: "",
        Weight: "",
        YearsOfLife: "",
        Image: "",
        Temperaments: []
    });

    function handleChange(e) {
        console.log("2", input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    };

    function handleSelect(e) {
        setInput({
            ...input,
            Temperaments: [...new Set([input.Temperaments, e.target.value])]
            // Temperaments: Array.from(new Set([input.Temperaments, e.target.value]))
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postNewDog(input))
        
        setInput({
            Name: "",
            Height: "",
            Weight: "",
            YearsOfLife: "",
            Image: "",
            Temperaments: []
        });
    };
    console.log(input);

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return (
        <div>
            <Link to = '/dogs'><button>Come Back</button></Link>
            <h1>create new breed of dog</h1>
            <form onClick={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type='text' value={input.Name} name='Name' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Height: </label>
                    <input type='number' value={input.Height} name='Height' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Weight: </label>
                    <input type='number' value={input.Weight} name='Weight' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Years of life: </label>
                    <input type='number' value={input.YearsOfLife} name='YearsOfLife' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text' value={input.Image} name='Image' onChange={(e) => handleChange(e)} />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {newTemp.map((t) => (
                        <option value={t.Name}>{t.Name}</option>
                    ))}
                </select>

                <br/>
                <button type='Submit' onClick={(e) => handleSubmit(e)}>Create breed</button>
            </form>
        </div>
    );
};



