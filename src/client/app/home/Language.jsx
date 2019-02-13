import React, { Component } from 'react';

import SelectFieldGroup from "client/app/common/SelectFieldGroup"
import TextFieldGroup from "client/app/common/TextFieldGroup"
class Language extends Component {
  constructor(props){
      super(props);
      this.state ={
        text:"",
        type:"",
        typeHeader:"نوع",
        typeList:[
          {
            id: "1",
            title: "انگلیسی",
            selected:false,
            key:"typeList"
  
          },
          {
            id: 2,
            title: "آلمانی",
            selected:false,
            key:"typeList"
          },
          {
            id: 3,
            title: "فرانسه",
            selected:false,
            key:"typeList"
          }, 
          {
            id: 4,
            title: "روسی",
            selected:false,
            key:"typeList"
          },
          {
            id: 5,
            title: "ایتالیایی",
            selected:false,
            key:"typeList"
          },
          {
            id: 6,
            title: "ترکی",
            selected:false,
            key:"typeList"
          }
        ],
        city:"",
        cityHeader:"شهر",
        cityList:[
          {
            id: "1",
            title: "تهران",
            selected:false,
            key:"cityList"
  
          },
          {
            id: 2,
            title: "کرج",
            selected:false,
            key:"cityList"
          },
          {
            id: 3,
            title: "اصفهان",
            selected:false,
            key:"cityList"
          },
          {
            id: 4,
            title: "بندرعباس",
            selected:false,
            key:"cityList"
          }
        ],
  
        neighbourhood:"",
        neighbourhoodHeader:"منطقه و محله",
        neighbourhoodList:[
          {
            id: "1",
            title: "منطقه 1 - آجودانیه",
            selected:false,
            key:"neighbourhoodList"
  
          },
          {
            id: 2,
            title: "منطقه 1 - آصف",
            selected:false,
            key:"neighbourhoodList"
          }
         
        ],
        errors:[],
        input:0
      }
     this.toggleSelected = this.toggleSelected.bind(this);
     this.onChange = this.onChange.bind(this);
  
    //  this.onChangeQ = this.onChangeQ.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
  
    }
    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    // filterText(filter){
    //    return filter.replace(/ی/g,'ي').replace(/ک/g,'ك');
    // }
    // onChangeQ(e){
    //   e.preventDefault();
    //   this.setState({input:this.refs.searchFilter.value.length})
    //   if(this.refs.searchFilter.value.length > 2){
    //     this.props.searchFetch(this.filterText(this.refs.searchFilter.value));
    //   }else{
    //     this.refs.searchFilter.focus();
    //   }
    // }
  
    onSubmit(e){
      e.preventDefault();
      if(this.refs.searchFilter.value.length == 0){
        this.refs.searchFilter.focus();
      }else{
        if(this.refs.searchFilter.value.length > 2){
            this.props.history.push(`/search?q=${this.refs.searchFilter.value}`)
        }else{
          this.refs.searchFilter.focus();
        }
      }
    }
  
    toggleSelected(id, key, state) {
      var temp = this.state[key].map(obj => {
        var rObj = {};
        rObj["id"] = obj.id;
        rObj["title"] = obj.title;
        rObj["selected"] = false;
        rObj["key"] = obj.key;
        return rObj;
      });
      temp[id].selected = !temp[id].selected;
      this.setState({
        [key]: temp,
        [state]: temp[id].title
      });
  
    }
render() {
  const { text,type,typeList,typeHeader,city,cityHeader,cityList,neighbourhood,neighbourhoodHeader,neighbourhoodList,errors } = this.state

  return (
      <form className="filter language" onSubmit={this.onSubmit}>
          <div className="form-select">
              <SelectFieldGroup
                title={type}
                headerDefalt={typeHeader}
                state={"type"}
                list={typeList}
                toggleItem={this.toggleSelected}
                icon={""}
                error={errors.art}
                isLoaded={true}
              />
          </div>
          
          <div className="form-select">
            <SelectFieldGroup
                title={city}
                headerDefalt={cityHeader}
                state="city"
                list={cityList}
                toggleItem={this.toggleSelected}
                icon={""}
                error={errors.city}
                isLoaded={true}
              />
          </div>
          <div className="form-select">
            <SelectFieldGroup
                title={neighbourhood}
                headerDefalt={neighbourhoodHeader}
                state="neighbourhood"
                list={neighbourhoodList}
                toggleItem={this.toggleSelected}
                icon={""}
                error={errors.neighbourhood}
                isLoaded={true}
              />
          </div>
          <div className="form-select">
             <TextFieldGroup
                type="text"
                name="text"
                label="آموزشگده یا دوره مورد نظر..."
                value={text}
                onChange={this.onChange}
                error={errors.text}
                icon={"k-edit"}
              />
          </div>
          <button className="btn">
            <span>جستجو</span>
            <div className="spinner">
              <div className="double-bounce1" />
              <div className="double-bounce2" />
            </div>
          </button>
        </form>
  )
}
}


export default Language;