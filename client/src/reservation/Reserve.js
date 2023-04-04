import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt from "jsonwebtoken";

const Reserve = () => {
    const params = useParams();
    /// console.log(params);
    const restaurantID = params.id;
    const [reservationName, setReserveName] = useState("");
    const [date, setReserveDate] = useState("");
    const [person, setReservePerson] = useState(1);
    const [time, setReservetime] = useState(1);
    const [option2, setReserveoption] = useState("");
    const [optionname, setReserveoptionname] = useState("");
    const [initialState, setInitialState] = useState([]);
    const [initialState2, setInitialState2] = useState([]);
    const timeComparison = () => {
        if (time >= initialState.openTime && time <= initialState.closeTime) {
            return true;
        }
        else {
            return false;
        }
    }
    const usertoken = localStorage.getItem("usertoken");
    console.log(usertoken);
    const decodeduser = jwt.decode(usertoken);
    console.log(decodeduser);

    
    const handleSubmit = async () => {
        if (decodeduser != null) {
            const userID = decodeduser.id;
            console.log("lol" + restaurantID);
            const newReserve = {
                userID,
                restaurantID,
                option2,
                optionname,
                reservationName,
                date,
                person,
                reserve_status: "DONE",
                time
            }
            console.log(newReserve);
            
            try {
                fetch(`/post/${restaurantID}`).then(res => {
                    return res.json();
                }).then(jsonResponse => setInitialState(jsonResponse));
                //test run for time validation of reservation
                // if(timeComparison()){
                //     console.log("ok");
                // }
                // else{
                //     console.log("not ok");
                // }
                fetch(`/offer/${restaurantID}`).then(res => {
                    return res.json();
                }).then(jsonResponse => { setInitialState2(jsonResponse); });
                console.log("INITIALSTATE:" + initialState2);
                let remainingSits = 0;
                let seatfound = false;
                initialState2.forEach(element => {
                    if (element._id == option2) {
                        console.log("we are watching" + element.remainingSits);
                         remainingSits = element.remainingSits - person;
                        // console.log("we are watching" + remainingSits);
                        if (element.remainingSits < person) {
                            alert("sorry, there is not enough seats available");
                        }
                        else {
                            seatfound = true;
                            //setReserveoptionname(element.offeringName);
                            console.log("we are watching offering name" + optionname);
                          //  alert("your reservation has been made");
                            // remainingsits = element.remainingSits - person;
                        }
                    }
                })



                if (seatfound) {
                    const response = await axios.post('/reserve/', newReserve);
                    console.log(response);
                    if ((response.status = 200)) {
                        alert("your reservation has been made");
                    }
                    const response3 = await axios.patch(`/offer/${option2}`, { remainingSits });
                }
                else {
                    alert("sorry, your reservation isnt processed for server issues");
                }
                //this is working but in line 57 
                //it is not working as it cannot current accss remainig sit 
            } catch (error) {
                console.log(error);
            }
        }
        else{
            alert("please login to reserve");
        }
    }
    //making options dropdown
    const [options, setOptions] = useState(null);
    useEffect(() => {
        getoptions();
    }, []);
    async function getoptions() {
        const { data } = await axios.get(`/offer/${restaurantID}`)
        const option = data.map((item) => ({
            "value": item._id,
            "label": item.offeringName
        }))
        // option.add({
        //     "value": "",
        //     "label": "Select an option"
        // })
        console.log("we are seening option: " + option);
        setOptions(option)
    }
    return (
        <div>
            <label>
                Reservation Name
                <input type="text" onChange={e => setReserveName(e.target.value)} />
            </label>
            <label>
                Reserving date
                <input type="date" onChange={e => setReserveDate(e.target.value)} />
            </label>
            <label>
                Number of Person
                <input type="Number" onChange={e => setReservePerson(e.target.value)} />
            </label>
            <label>
                Which offerings you want to attend
                {/* <select onChange={e => {setReserveoption(e.target.value)
                setReserveoptionname(e.target.label)}}>
                    <option value="">Select an option</option>
                    {options && options.map((item) => (
                        <option value={item.value}>{item.label}</option>
                    ))}
                </select> */}
                <Select
                    options={options}
                    defaultValue = {
                        {
                            "value": "",
                            "label": "Select an option"
                        }
                    }                                            //need to add "select option" to solve the
                                                                 //db issues
                    onChange={(e) => {setReserveoption(e.value); setReserveoptionname(e.label)}}
                    name="subjects"
                />
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />

        </div>);
}

export default Reserve;