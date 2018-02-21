import React, { Component } from 'react';
import Dropdown from './Dropdown';
import Carousel from './Carousel';
import data from '../data.json';

import _ from 'lodash';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.filteredImages = this.filteredImages.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.photosToDisplay = [];
    this.previousPage = this.previousPage.bind(this);
    this.selectQuality = this.selectQuality.bind(this);
    this.selectStyle = this.selectStyle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      currentPage: 1,
      dropdownOpen: false,
      selectedQualities: {},
      selectedStyles: {}
    };
  };
  toggleDropdown(e) {
    e.stopPropagation();
    const closeDropDown = () => {
      this.setState({
        dropdownOpen: false
      }, () => document.removeEventListener('click', closeDropDown));
    };
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    }, () => {
      document.addEventListener('click', closeDropDown);
    });
  };
  selectStyle(id) {
    return () => {
      var selectedStyles = Object.assign({}, this.state.selectedStyles);
      if (selectedStyles[id]) {
        delete selectedStyles[id];
      } else {
        selectedStyles[id] = _.head(data.designStyle.filter(item => item.id === id));
      }
      this.setState({
        selectedStyles
      })
    }
  };
  selectQuality(id) {
    return () => {
      var selectedQualities = Object.assign({}, this.state.selectedQualities);
      if (this.state.selectedQualities[id]) {
        delete selectedQualities[id];
      } else {
        selectedQualities[id] = _.head(data.qualityStandard.filter(item => item.id === id));
      }
      this.setState({
        selectedQualities
      });
    }
  };
  filteredImages() {
    const filteredImages = data.data.filter((image) => {
        const isStyleMatch = _.some(image.metaData.designStyle, id => this.state.selectedStyles[id]);
        if (_.isEmpty(this.state.selectedQualities)) {
          return isStyleMatch; // no need to worry about quality if none selected
        }
        return isStyleMatch && _.some(image.metaData.qualityStandard, id => this.state.selectedQualities[id])
      }
    );
    if (_.size(filteredImages) > 0) return filteredImages;
    else if(!_.isEmpty(this.state.selectedQualities) || !_.isEmpty(this.state.selectedStyles)) return [];
    return data.data;
  };
  nextPage() {
    if (this.state.currentPage < Math.ceil(this.photosToDisplay.length / 9)) {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
    }
  };
  previousPage() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      })
    }
  };
  render() {
    const selectedStylesBubbles = _.map(this.state.selectedStyles, item => {
      return item ?(<div className="selected-filter-bubble" key={item.id}>
        <span>{item.label}</span>
        <i className="fas fa-times-circle" onClick={this.selectStyle(item.id)}/>
      </div>) : null;
    });
    const selectedQualityBubbles = _.map(this.state.selectedQualities, item => {
      return item  ? (
        <div className="selected-filter-bubble" key={item.id}>
          <span>{item.label}</span>
          <i className="fas fa-times-circle" onClick={this.selectQuality(item.id)} />
        </div> ) : null;
    });
    this.photosToDisplay = this.filteredImages();
    return (
      <div>
        <h1>Multi-row Carousel</h1>
        <div className="home-improvement-board">
          <div id="filters">
            <button className="btn-filter" onClick={this.toggleDropdown}>
              <i className="fa fa-filter" />
              <i className="fas fa-caret-down" />
            </button>
            {selectedStylesBubbles}
            {selectedQualityBubbles}
          </div>
          { this.state.dropdownOpen ? <Dropdown designStyle={data.designStyle} selectStyle={this.selectStyle} selectQuality={this.selectQuality} /> : '' }
          <Carousel nextPage={this.nextPage} previousPage={this.previousPage} photos={this.photosToDisplay} currentPage={this.state.currentPage} />
        </div>
      </div>
    );
  }
}

export default App;