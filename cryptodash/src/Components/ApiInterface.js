import React,{Component} from 'react';
import axios from 'axios';
import DropDown from "./DropDown";

/*
* This is a statefull React component which makes an API call to
* "https://api.coinmarketcap.com/v1/ticker/?limit=0"
* This API returns the ranking of all cryptocurrencies my volume
* in the last 24 hours. This code then stores the API response
* in the state variables of the class and renders them appropriately
* via a sleek UI.
*  */
class ApiInterface extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currencies: null,
            details:null,
            apiTarget:null,
            range:50,
            currentDetails:<div className="currentDetails"><br/>Click on currencies for details.</div>,
            currencyChange:null,
            currentCurrencyChange:null
        };
    this.displayInfo = this.displayInfo.bind(this);
    this.getData = this.getData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){


        axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
            .then(res => {
                // Sorting the Response Array by Volume Traded
                res.data.sort((a,b) => b['24h_volume_usd']-a['24h_volume_usd']);

                //Assigning Rankings to the currencies
                let index=0;
                //Making an array containig limited details of currencies for the list view.
                let currencies = res.data.map((item,index) => {
                    return (
                        <div className="row tableText"
                             //incrementing index and assiging unique keys to each currency element.
                             key={++index}
                             //each entry on the list is clickable and on clicking will call displayInfo
                            // event handler
                             onClick={this.displayInfo.bind(this,index)}>

                            <div className="col-sm-2 text-right pointer">{index}
                            </div>
                            <div className="col-sm-4  text-left pointer">{item.name}
                            </div>
                            <div className="col-sm-3  pointer text-right">{item['24h_volume_usd']}
                            </div>
                            <div className="col-sm-3"></div>
                        </div>);
                });
                this.setState({currencies:currencies});


                let anotherIndex=0;
                //Making an array containing the details of every currency.
                let details = res.data.map((item,anotherIndex) => {
                    return (

                        <div className="infoText text-right" key={++anotherIndex}>

                            Rank <span className="bold fontSize18">{anotherIndex}</span><br/>
                            Name <span className="bold fontSize18">{item.name}</span><br/>
                            Change <span className="bold change-text fontSize18">{item.percent_change_24h}%</span><br/>
                            Market Cap <span className="bold fontSize18">{item.market_cap_usd}</span><br/>

                            Available Supply <span className="bold fontSize18">{item.available_supply}</span><br/>
                            Total Supply <span className="bold fontSize18">{item.total_supply}</span><br/>
                            <span className="symbol text-left">{item.symbol}</span>
                            <span className="price_usd text-left">${item.price_usd}</span>

                        </div>);
                });
                this.setState({details:details});

                //Making an array containing percentage change of all the currencies
                let change = res.data.map((item,index) =>{
                    return item.percent_change_24h
                })
                this.setState({currencyChange:change});

            })
    }

    displayInfo(key=0){
        //When a user clicks on a currency from the list, the respective key is captured
        // and passed to this fucntion. This function then displays its details.


        if (this.state.details!==null){
            let current= this.state.details[key-1];
            this.setState({currentDetails:current});
            let currentChange = this.state.currencyChange[key-1];
            this.setState({currentCurrencyChange:currentChange});
            return;
        }

    }

    getData(val){
        // Updating the range state variable from the input received from the drop down menu
        // Range==0 is the default API response returning all the values available.
        // Hence keeping with the tradition, a range of '0' will refer to all available currencies

        if (val==='All'){
            this.setState({range:0});

        }else{
        this.setState({range:val})
        }
    }

     // Function handling click action on the
     // volume traded column header

    handleClick(){
        //Switching between ascenind and descending ranking of the currencies
        let reverseList = this.state.currencies.reverse();
        this.setState({currencies:reverseList});

    }


    render(){

        return(
            <div>

                {/* Dropdown menu rendering here. The selected value is being received
                    here by the parent component.
                */}
                <DropDown sendData = {this.getData} className="dropdown"/>

                <div className="fixed row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-7">
                        <div className="row bold tableHeader">
                            <div className="col-sm-2 greenText text-right">Rank
                            </div>
                            <div className="col-sm-3 greenText text-left">Name
                            </div>
                            <div className="col-sm-4 greenText text-right">
                                <button onClick={this.handleClick}>
                                Volume Traded in 24 hours
                                </button>
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                    </div>

                    {/*Displaying the details of the currency which is currently selected.*/}
                    <div className="col-sm-4 gray information">

                        {this.state.currentDetails}


                    </div>
                    <div className="change">
                        {/*This part is for rendering the arrows in the info part. The arrows are
                           dependent on the percentage change value of the API response. A positive
                           percentage would make the arrow-up and a negative value would render a down
                           arrow. Th first condition just checks just so that a null value doesnn't break
                           the application.
                        */}
                        {this.state.currentCurrencyChange===null?
                            '':this.state.currentCurrencyChange>=0?
                                <div><span className="arrow-up arrow"></span></div>
                                :<div><span className="arrow-down arrow"></span></div>}

                        <div className="metadata">
                            {/*<span className="metadata-header">Metadata</span>*/}
                            <br/>
                            <div className="text-left">
                            Data procured via: <a href="https://coinmarketcap.com/api/"><code className="code-text">https://coinmarketcap.com/api/</code></a>
                            <br/>
                            Criteria: The cryptocurrencies are ranked according to their respective volume traded in the past 24 hours.
                            </div>
                        </div>
                    </div>



                </div>

                <br/>
                <div className="row below-fixed">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-7">
                        {/*
                        The first condition is there to make sure a null state doesn't break the view.
                        The second condition checks for the range and displays all values if the
                        condition is true. Else the currency list is sliced and displayed according
                        to the input range.
                        */}

                        {this.state.currencies===null?
                            'No API response':(this.state.range===0?
                                this.state.currencies:this.state.currencies.slice(0,this.state.range))}
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
                <div className="before-footer"></div>
            </div>
        );
    }
}

export default ApiInterface;