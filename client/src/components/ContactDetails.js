import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDown, faPhoneSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = true
class ContactDetails extends React.Component{
    render() {
        return(
            <div className="row" style={{margin: "10px"}}>

                {/*render div1*/}
                <div className="col-md-6">
                    {this.props.contact.mobile.map((mobile)=>{
                        return(
                            <div className="row"><FontAwesomeIcon  style={{marginTop: "3px"}} icon={faPhoneSquare}/> {mobile}</div>
                        )
                    })}
                </div>


                {/*render div2*/}
                <div className="col-md-6">
                    {this.props.contact.email.map((email)=>{
                        return(
                            <div className="row"><FontAwesomeIcon style={{marginTop: "3px"}} icon={faEnvelope}/> {email}</div>
                        )
                    })}
                </div>

            </div>
        )
    }
}

export default ContactDetails