import React from 'react';
import {
    Link
} from "react-router-dom";

function parseDateToString(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function CardArticle(props) {
    const { articleList } = props;
    return (
        articleList ? articleList.map((item, i) => {
            console.log('item', item);
            const date = new Date(item.createDate);
            const strCreateDate = parseDateToString(date);
            const linkImage = `${process.env.REACT_APP_IMAGE_URL}${item.image400x400}`
            
            return (<div key={item._id} className="col-lg-4">
                <div className="mb-5 mb-lg-0" data-animate-hover="1">
                    <div className="animate-this">
                        <Link to={`/article/${item.slugName}.${item._id}`}>
                            <img alt="Image" className="img-fluid rounded shadow"
                                src={linkImage} />
                        </Link>
                    </div>
                    <div className="pt-4">
                        <small className="text-uppercase">{strCreateDate}</small>
                        <h5>{item.title}</h5>
                        <p className="mt-3">{item.description}</p>
                    </div>
                </div>
            </div>)
        }) : ''
    );
}

export default CardArticle;