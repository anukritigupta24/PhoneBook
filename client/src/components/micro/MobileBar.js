import react, {Component} from "react";

export default class MobileBar extends Component {
    render() {
        return (
            <div className="form-group">
                <label>Mobile</label>
                <div className="row">
                    <div style={{width: "90%", marginLeft: "15px"}}>
                        <input type="text" className="form-control" name="mobile" placeholder="Enter Mobile"/>
                    </div>
                    <div style={{width: "5%"}}>
                        <img style={{width: "30px", height: "30px"}}
                             src="data:image/png;base64,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 "/>
                    </div>
                </div>

            </div>)
    }
}