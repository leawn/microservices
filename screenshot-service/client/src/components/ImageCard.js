import React, { Component } from "react";

class ImageCard extends Component {
    state = { open: false };

    renderedCard = image => {
        return (
            !image.cloudinaryUrl ? (
                <div className="card ui segment" style={{ height: "200px"}}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="ui mini menu">
                        <div className="item">
                            <i className="check circle icon"></i>
                        </div>
                    </div>
                    <div className="image">
                        <img
                            src={image.cloudinaryUrl}
                            style={{height: "200px", width: "auto", margin: "auto"}}
                            alt=""
                        />
                    </div>
                    <div className="content">
                        <div className="header">
                            {image.id}
                        </div>
                    </div>
                    <div className="extra content">
                        <span><i className="left image"></i>{image.format.toUpperCase()}</span>
                        <span className="right floated">{image.height} x {image.width}</span>
                    </div>
                    <div className="ui bottom attached bottom" onClick={() => this.props.deleteScreenshot(image.id)}>
                        <i className="trash icon"></i>Delete Screenshot
                    </div>
                </div>
            )
        )
    }

    render() {
        return this.renderedCard(this.props.image);
    }
}

export default ImageCard;