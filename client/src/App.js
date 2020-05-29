import React from 'react';
import {Link} from "react-router-dom";
import './App.css';
import Pagination from "react-js-pagination";
import ContactDetails from "./components/ContactDetails"
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDown, faMobile } from '@fortawesome/free-solid-svg-icons'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = true



class App extends React.Component {

    state = {
        query:'',
        searching:false,
        perPage:1,
        contacts : [],
        open: {},
        visible:undefined,
        activePage: 1,
        offset:0
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    handleSearchInput(e){
        this.setState({query:e.target.value})
    }
    search(){
        let queryString = this.state.query;
        this.setState({searching:true})
        axios.get('/contacts/find?q='+queryString).then(res=>{
            this.setState({contacts:res.data,searching:false})}
        ).catch(err=>{
            console.log(err)
            this.setState({searching:false})
        })
    }
    deleteContact(id,index){
        // this.setState({contacts:this.state.contacts.filter((val,ind)=>(index!=ind))})
        axios.delete('/contacts/delete/' + id)
            .then(res=> {
                this.setState({contacts:this.state.contacts.filter((val,ind)=>(index!=ind))})
            })
            .catch((err)=>{})
    }
    componentDidMount() {

        axios.get('/contacts/')
            .then((res)=>{
                this.setState({
                    contacts: res.data
            })

            })
            .catch((err) =>{
                console.log(err)
            });

    }



render() {

        var contacts = this.state.contacts;

        return (
            <div className="App ">
                <div className="container-fluid" style={{width: "40%", margin: "auto"}}>

                    {/*row starts*/}
                    <div className="row">
                        <div className="input-group" style={{marginTop: "100px"}}>
                            <input type="text" value={this.state.query} onChange={this.handleSearchInput.bind(this)} className="form-control" placeholder="Search"/>
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" onClick={this.search.bind(this)}>
                                    <span className="glyphicon glyphicon-search">Search</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/*row ends*/}

                    {/*row start*/}
                    <LoadingOverlay
                        active={this.state.searching}
                        spinner
                        text='Fetching data from Server'
                    >
                    <div style={{marginTop: "40px"}}>
                        <div hidden={( this.state.contacts.length!=0)} className="alert alert-danger" role="alert">
                           Oh No! No Results Found. Try improving the search query.
                        </div>
                        { contacts.slice((this.state.activePage-1)*this.state.perPage,this.state.perPage*this.state.activePage).map((contact,index) => {
                            console.log()
                            return <div style={{marginBottom: "10px"}}>
                                <div className="dropdown">
                                <button className="btn dropdown-toggle border border-dark"
                                        onClick={()=> {
                                            if (index != this.state.visible)
                                                this.setState({visible: index})
                                            else this.setState({visible: undefined})
                                        }
                                        }
                                        type="button"
                                                                style={{marginDown: "100px", fontSize: "20px", width: "100%"}}
                                                                key={contact._id}>{contact.name}

                                </button>

                                    {/*contact box*/}

                                <div hidden={index!=this.state.visible} className="border border-dark" style={{backgroundColor: "lightblue"}}>
                                    <div  className="container">
                                        <div className="row">
                                            <div style={{width: "90%",  padding: "10px"}}>
                                                <span style={{float: "left"}}>{contact.name}</span>
                                            </div >
                                            <div style={{width: "10%",  padding: "10px"}}>

                                                <span style={{float: "right", margin: "5px"}}>
                                                <FontAwesomeIcon icon={faAngleDown} />

</span>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{width:"20%", padding: "10px"}}>
                                        <span style={{float: "left", padding: "auto"}}>{new Date(contact.dob).toLocaleDateString()}</span>
                                            </div>
                                            <div style={{width:"80%", padding: "10px"}}>
                                            <span style={{float: "right"}}>
                                                <Link to={{pathname: "/edit/contact/" + contact._id,
                                                state: contact}
                                                }>
                                                    <button style={{margin: "5px"}} className="btn btn-info">Edit</button></Link>



                                                    <button style={{margin: "5px"}} className="btn btn-danger" onClick={()=>this.deleteContact(contact._id,index)}>Remove</button>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: "whitesmoke", margin: "10px"}}>
                                        <ContactDetails contact={contact}/>

                                    </div>
                                </div>

                                    {/*contact box ends*/}
                                </div>
                            </div>

                        })}

                    </div>
                    </LoadingOverlay>
                    {/*row ends*/}

                    {/*row starts*/}

                    <div className="row">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={this.state.contacts.length}
                            pageRangeDisplayed={10}
                            linkClass="page-link active"
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>

                    {/*row ends*/}
                </div>
                <span >
                    <Link to="/create/contact" >
                        <img style={{width: "80px", height: "80px"}} src="data:image/png;base64,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 "/></Link>
                </span>

            </div>
        );

    }
}

export default App;
