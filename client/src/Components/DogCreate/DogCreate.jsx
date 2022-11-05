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
        Height_Min: "",
        Height_Max: "",
        Weight_Min: "",
        Weight_Max: "",
        YearsOfLife: "",
        Image: "",
        Temperaments: []
    });

    function handleChange(e) {
        // console.log("2", input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    };

    function handleSelect(e) {
        setInput({
            ...input,
            Temperaments: [...input.Temperaments, e.target.value]
            // Temperaments: Array.from(new Set([input.Temperaments, e.target.value]))
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postNewDog(input))
        setInput({
            Name: "",
            Height_Min: "",
            Height_Max: "",
            Weight_Min: "",
            Weight_Max: "",
            YearsOfLife: "",
            Image: "",
            Temperaments: []
        });
    };
    console.log("9",input);

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    return (
        <div>
            <Link to = '/dogs'><button>Come Back</button></Link>
            <h1>Create new breed of dog</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type='text' value={input.Name} name='Name' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Height: </label>
                    <input placeholder="Min" type='number' value={input.Height_Min} name='Height_Min' onChange={e => handleChange(e)} />
                    <input placeholder="Max" type='number' value={input.Height_Max} name='Height_Max' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Weight: </label>
                    <input placeholder="Min" type='number' value={input.Weight_Min} name='Weight_Min' onChange={e => handleChange(e)} />
                    <input placeholder="Max" type='number' value={input.Weight_Max} name='Weight_Max' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Years of life: </label>
                    <input type='number' value={input.YearsOfLife} name='YearsOfLife' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text' value={input.Image} name='Image' onChange={e => handleChange(e)} />
                </div>
                <select onChange={e => handleSelect(e)}>
                    {newTemp.map((t) => {
                        return (
                        <option value={t.Name}>{t.Name}</option>
                      )}
                    )}
                </select>

                <br/>
                <button type='Submit'>Create breed</button>
            </form>
        </div>
    );
};



