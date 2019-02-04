import React, {
    Component
} from 'react'

class UpLoadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            img: null,
            checker: "",
            name: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    fileTypeChecker(value, type) {
        return (new RegExp("(.*?)\." + type + "$").test(value.toLowerCase()));
    }
    handleChange(e) {
      
        const file = e.target.files[0];
        
        if (!this.fileTypeChecker(file.name, "(png|jpeg|jpg)")) {
            this.setState({
                checker: "لطفا فایل انتخاب شده باید با فرمت  png ،jpeg و jpg باشد..."
            })

        } else {

            if (file.size < 2097152) {
                this.setState({
                    file: file,
                    img: URL.createObjectURL(file),
                    name: [file.name],
                    checker: "",

                })

            } else {
                this.setState({
                    checker: "سایز فایل باید کمتر از 2 M باشد..."
                })

            }

        }

    }
    onClick() {
        const inputFile = this.refs.inputFile;
        inputFile.click();
    }
    render() {
        const {
            icon,
            label,
            selectFile,
            error
        } = this.props
        const {
            file,
            img,
            name,
            checker,
            flag,
        } = this.state
        return (
            <div className="form-group">
                <div  className={ checker || error ? "form-file error" : "form-file"} >
                    <i className={"first-child " + icon}></i>
                    <span className="label"> { label }</span>
                    <input ref="inputFile" type="file" onChange={this.handleChange} onClick={() => selectFile(file,flag)} />
                    {img 
                        ?<div className="img-cover">
                            <img src={img} />
                            <div>{name}</div>
                        </div>
                        :<div className="icon-cover">
                            <i className="k-image1"></i>
                        </div>
                    }
                    <div className="btn" onClick={this.onClick} >انتخاب فایل</div>
                </div>
                {checker || error ? <label className="invalid-feedback">{checker || error}</label> : ""}
            </div>
        )
    }
}
export default UpLoadFile;