import React from "react";
import axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {Link} from "react-router-dom";
config.autoAddCss = true



export default class CreateContact extends React.Component{
    state = {
        name: undefined,
        dob: undefined,
        mobile: [],
        email : [],
        mobileCount:[0], emailCount:[0],
        contactAddStatus: false,
    }

    sendForm = (e) =>{
        e.preventDefault()
        axios.post("/contacts/add/", {name: this.state.name, dob: this.state.dob, mobile: this.state.mobile, email: this.state.email})
            .then((res)=>{
                this.setState({
                    contactAddStatus: true
                })
                setTimeout(()=>{
                    this.setState({
                        contactAddStatus: false
                    })
                }, 2000)
                console.log("added succ")
            })
            .catch((err)=>{})
    }
    handleNameChange = (e) =>{
        this.setState({name:e.target.value})
    }
    handleDateChange = (e) =>{
        this.setState({dob: e.target.value})
    }
    handleMobChange = (e)=>{
        const currentList = this.state.mobile;
        currentList[e.target.id]=e.target.value;
        this.setState({mobile:currentList})
    }
    handleEmailChange = (e) =>{
        const currentList = this.state.email;
        currentList[e.target.id]=e.target.value;
        this.setState({email:currentList})
    }
    addMobile = ()=>{
        this.setState({mobileCount:this.state.mobileCount.concat([this.state.mobileCount.length])});
    }
    addEmail = ()=>{
        this.setState({emailCount:this.state.emailCount.concat([this.state.emailCount.length])})
    }
    render() {
        return (
            <div className="container-fluid " style={{width: "40%", margin: "auto"}}>
                <div className="container border border-dark" style={{marginTop: "100px"}}>
                    <div class="row" style={{marginTop : "6px", marginLeft: "2px"}}>
                        <Link to="/" >
                            <FontAwesomeIcon  style={{marginTop : "4px", marginRight: "4px"}} icon={faArrowLeft}/></Link>
                    <h5>Add New Contact</h5>
                    </div>
                    <form onSubmit={this.sendForm}>
                        <div className="form-group">
                            <label >Name</label>
                            <input onChange={this.handleNameChange} type="text" className="form-control" name="name" value={this.state.name} placeholder="Enter name"/>

                        </div>
                        <div className="form-group">
                            <label >DOB</label>
                            <input  type="date" className="form-control" onChange={this.handleDateChange} value={this.state.dob} name="dob"/>
                        </div>

                        <div className="form-group">
                            <label >Mobile</label>
                            {
                                this.state.mobileCount.map(id=>(
                                    <div className="row mt-1" key={id} style={{marginLeft:"2px"}}>
                                        <div style={{width: "92%"}}>
                                            <input type="number" className="form-control" id={id} name="mobile" placeholder="Enter Mobile" onChange={this.handleMobChange} value={this.state.mobile[id]}/>
                                        </div>
                                        <div >
                                            <FontAwesomeIcon onClick={this.addMobile} icon={faPlusCircle}/>
                                        </div>
                                    </div>))
                            }
                        </div>
                        <div className="form-group">
                            <label >Email</label>
                            {
                                this.state.emailCount.map(id=>(
                                    <div className="row mt-1" key={id} style={{marginLeft:"2px"}}>
                                        <div style={{width: "92%"}}>
                                            <input type="email" className="form-control" id={id} name="email" placeholder="Enter Email" onChange={this.handleEmailChange} value={this.state.email[id]}/>
                                        </div>
                                        <div >
                                            <FontAwesomeIcon onClick={this.addEmail} icon={faPlusCircle}/>
                                        </div>
                                    </div>))
                            }
                        </div>
                        <button style={{marginBottom: "5px"}} type="submit" className="btn btn-success">Save</button>
                    </form>
                </div>
                <div hidden={!this.state.contactAddStatus} className="alert alert-success" role="alert" style={{marginTop: "20px"}}>
                    Contact Added Successfully!
                </div>
            </div>
        );
    }
}
