import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: 4,
      columns: 4,
      row: null,
      column: null
    };
  }

  addRow() {
    let cur_rows = this.state.rows;
    //this.refs.table.insertRow(cur_rows);
    this.setState({rows: cur_rows + 1}) 
  }

  addColumn() {
    let cur_columns = this.state.columns;
    //this.refs.table.insertRow(cur_rows);
    this.setState({columns: cur_columns + 1})
  }

  removeButtonShow(row, column) {
    this.setState({row: row, column: column})
  }

  removeRow() {
    this.refs.table.deleteRow(this.state.row);
  }

  render() {
    let rows = [];
    let r_count = this.state.rows;
    let c_count = this.state.columns;

    for(let row = 0; row < r_count; row++) {
      let columns = []
      for(let column = 0; column < c_count; column++) {
        columns.push(
          <td onMouseEnter={this.removeButtonShow.bind(this, row, column)} 
            key={`${row}_${column}`} 
            row={row} 
            column={column}
          ></td>
        )  
      }
      rows.push(
        <tr key={row}>
          { columns }
        </tr>
      )
    }
    
    return (
      <div className="App">
        <table className='add column'>
          <tbody>
            <tr>
              <td onClick={this.addColumn.bind(this)}>
              +
              </td>
            </tr>
          </tbody>
        </table>
        <table ref='table' id='originTable'>
          <tbody>
            { rows }
          </tbody>  
        </table>
        <table className='add row'>
          <tbody>
            <tr>
              <td onClick={this.addRow.bind(this)}>
              +
              </td>
            </tr>
          </tbody>
        </table> 
      </div>
    );
  }
}

export default App;