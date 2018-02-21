import React from 'react';

function createRow(images) {
  return images.map(item => {
    const ratio = 200 / item.height;
    const scaledWidth = Math.round(item.width * ratio);
    return (
      <div className="image" key={item._id}>
        <img src={item.imageKey} className="testing" alt={`inspiration ${item._id}`} width={scaledWidth}/>
        <i className="fas fa-heart"/>
      </div>
    )
  })
}

function createRows(images, page) {
  let rowOnePhotos;
  let rowTwoPhotos;
  let rowThreePhotos;

  if (images.length <= 9) {
    rowOnePhotos = images.slice(0, 3);
    rowTwoPhotos = images.slice(3, 6);
    rowThreePhotos = images.slice(6, 9);
  }
  // page 1
  else if (page === 1) {
    rowOnePhotos = images.slice(0, 4);
    rowTwoPhotos = images.slice(4, 8);
    rowThreePhotos = images.slice(8, 12);
  }
  // page greater than 1
  else if (page > 1) {
    const end = 12 * page - (3 * (page - 1));
    const begin = end - 9;
    //number of images * row number * (current page - 1) + 1, number of images * row number * (current page - 1) + (row - 1) + 1
    rowOnePhotos = images.slice(3 * (page - 1), 3 * (page - 1) + 1).concat(images.slice(begin, begin + 3));
    rowTwoPhotos = images.slice(3 * 2 * (page - 1) + 1, 3 * 2 * (page - 1) + 1 + 1).concat(images.slice(begin + 3, begin + 6));
    rowThreePhotos = images.slice(3 * 3 * (page - 1) + 2, 3 * 3 * (page - 1) + 2 + 1).concat(images.slice(end - 3, end));
  }
  return (
    <div className="image-page">
      {rowOnePhotos && <div className="image-row image-row-1">{createRow(rowOnePhotos)}</div>}
      {rowTwoPhotos && <div className="image-row image-row-2">{createRow(rowTwoPhotos)}</div>}
      {rowThreePhotos && <div className="image-row image-row-3">{createRow(rowThreePhotos)}</div>}
    </div>
  )
}
export default (props) =>
  <div className="row carousel">
    <div className="col-sm-1 scroll left-scroll">
      <i className="fas fa-angle-left" onClick={props.previousPage}/>
    </div>
    <div className="col-sm-10 photos">
      <div className="test">{createRows(props.photos, props.currentPage)}</div>
    </div>
    <div className="col-sm-1 scroll right-scroll">
      <i className="fas fa-angle-right" onClick={props.nextPage}/>
    </div>
  </div>;