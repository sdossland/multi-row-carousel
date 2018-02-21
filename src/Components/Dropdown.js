import React from 'react';

export default (props) => {
    const styles = props.designStyle.map(style =>
      <div className="row style-selector" key={style.id} onClick={props.selectStyle(style.id)}>{style.label}</div>
    );
    return (
      <div id="dropdown">
        <div className="row dropdown-contents">
          <div id="style-filter" className="col-xs-6 col-filter">
            <div className="row dropdown-header">Style</div>
            {styles}
          </div>
          <div id="quality-filter" className="col-xs-6 col-filter">
            <div className="row dropdown-header">Quality</div>
            <div id="five-stars" className="row quality-selector" onClick={props.selectQuality(5)}>
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
            <div id="four-stars" className="row quality-selector" onClick={props.selectQuality(4)}>
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="far fa-star" />
            </div>
            <div id="three-stars" className="row quality-selector" onClick={props.selectQuality(3)}>
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
            </div>
            <div id="two-stars" className="row quality-selector" onClick={props.selectQuality(2)}>
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
            </div>
            <div id="one-stars" className="row quality-selector" onClick={props.selectQuality(1)}>
              <i className="fas fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
              <i className="far fa-star" />
            </div>
          </div>
        </div>
      </div>
    );
  };