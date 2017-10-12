import React from 'react';

const Cell = function(props) {
    return(
      <td className={props.className} onClick={props.onClick} onMouseEnter={props.onMouseEnter}
        style={{visibility: props.visibility}}
      >{props.value}</td>
    );
};

export default Cell