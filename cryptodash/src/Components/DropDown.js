import React,{Component} from 'react';

class DropDown extends Component{
    constructor(props) {
        super(props);
        this.state = {value: '-'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({value: event.target.value});

        this.props.sendData(event.target.value);
        event.preventDefault();
        // console.log(this.state.value);

    }

    handleSubmit(event) {

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select number of items to display
                </label>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value=""></option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="All">All</option>
                    </select>

                {/*<input type="submit" value="Go Fetch!" />*/}
            </form>
        );
    }
}

export default DropDown;