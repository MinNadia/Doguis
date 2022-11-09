import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewDog, getTemperaments } from "../../Actions/actions";
import st from "./DogCreate.module.css";


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

    
    const [errors, setErrors] = useState({})
    const [errorButton, setErrorButton] = useState(Object.keys(errors).length < 1 ? false : true);
   

   const validate = (input) => {
        let errors = {};
        
        if (!input.Name) errors.Name = "Name is required";
         else if (!/[A-Za-z\s]*$/.test(input.Name))
            errors.Name = "Only letters and spaces are allowed";
        //  else if (dogs.includes(input.Name)) errors.race = "Race already exists";
        // if(input.Name === validateName) return "No cumple con el rango reuerido";
        
        if(!input.Height_Min) errors.Height_Min = "Height Min is required";
         else if(input.Height_Min < 20 && input.Height_Min > input.Height_Max)
           errors.Height_Min = "The value is wrong";

        if(!input.Height_Max) errors.Height_Max = "Height Max is required";
         else if(input.Height_Max > 90 && input.Height_Max < input.Height_Min)
           errors.Height_Max = "The value is wrong";

        if(!input.Weight_Min) errors.Weight_Min = "Weight Min is required";
         else if(input.Weight_Min < 30 && input.Weight_Min > input.Weight_Max)
           errors.Weight_Min = "The value is wrong";

        if(!input.Weight_Max) errors.Weight_Max = "Weight Max is required";
         else if (input.Weight_Max > 100 && input.Weight_Max < input.Weight_Min)
           errors.Weight_Max = "The value is wrong";

        if(!input.YearsOfLife) errors.YearsOfLife = "Years of life Max is required";
         else if(input.YearsOfLife > 15 && input.YearsOfLife < 10)
           errors.YearsOfLife = "The value is wrong";

        if(typeof input.Image !== "string") errors.Image = "The data entered is incorrect";

        return errors;
    }

    function handleChange(e) {
        // console.log("2", input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    };

    function handleSelect(e) {
        setInput({
            ...input,
            Temperaments: input.Temperaments.includes(e.target.value) ?
                          input.Temperaments :
                          [...input.Temperaments, e.target.value]               
            // Temperaments: Array.from(new Set([input.Temperaments, e.target.value]))
        }); 
        // if(Array.isArray(input.Temperaments)) { 
        //     input.Temperaments.toString()
        // }   
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
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));      
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
                    {errors.Name && (<h4 className={st.error}>{errors.Name}</h4>)}
                </div>
                <div>
                    <label>Height: </label>
                    <input placeholder="Min" type='number' value={input.Height_Min} name='Height_Min' onChange={e => handleChange(e)} />
                    {errors.Height_Min && (<h4 className={st.error}>{errors.Height_Min}</h4>)}
                    <input placeholder="Max" type='number' value={input.Height_Max} name='Height_Max' onChange={e => handleChange(e)} />
                    {errors.Height_Max && (<h4 className={st.error}>{errors.Height_Max}</h4>)}
                </div>
                <div>
                    <label>Weight: </label>
                    <input placeholder="Min" type='number' value={input.Weight_Min} name='Weight_Min' onChange={e => handleChange(e)} />
                    {errors.Weight_Min && (<h4 className={st.error}>{errors.Weight_Min}</h4>)}
                    <input placeholder="Max" type='number' value={input.Weight_Max} name='Weight_Max' onChange={e => handleChange(e)} />
                    {errors.Weight_Max && (<h4 className={st.error}>{errors.Weight_Max}</h4>)}
                </div>
                <div>
                    <label>Years of life: </label>
                    <input type='number' value={input.YearsOfLife} name='YearsOfLife' onChange={e => handleChange(e)} />
                    {errors.YearsOfLife && (<h4 className={st.error}>{errors.YearsOfLife}</h4>)}
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text' value={input.Image} name='Image' onChange={e => handleChange(e)} />
                    {errors.Image && (<h4 className={st.error}>{errors.Image}</h4>)}
                </div>
                <select onChange={e => handleSelect(e)}>
                    {newTemp.map((t) => {
                        return (
                        <option value={t.Name}>{t.Name}</option>
                      )}
                    )}
                </select>
                <ul>{input.Temperaments.map(el => el + ", ")}</ul>

                <br/>
                <button type='Submit' disabled={errorButton}>Create breed</button>
            </form>
        </div>
    );
};



