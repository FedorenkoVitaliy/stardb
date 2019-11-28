import React, { Component, Children } from 'react';

import './ItemDetails.css';
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";

const Record = ({item, field, label}) => {
    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ field }</span>
        </li>
    );
};

export {
    Record
}

export default class ItemDetails extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loading: false,
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if (this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if(!itemId){
            return ;
        }
        this.setState({loading: true});

        getData(itemId)
            .then((item) => {
                this.setState({
                    item: item,
                    image: getImageUrl(item),
                    loading: false,
                })
            })
    }

    render() {
        const { item, image } = this.state;
        if(!this.state.item) {
            return <span>Select a item from a list</span>
        }

        const { name, gender, birthYear, eyeColor } = item;

        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image}
                     alt='item img'
                />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            Children.map(this.props.children, (child, idx) => {
                                return <li>{idx}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}