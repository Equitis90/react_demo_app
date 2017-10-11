import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [...Array(5).keys()].map(i => Array(5).fill('')),
      row: null,
      column: null
    };
  }

  createCell(row, column) {
    if(row === 0 && column === 0) {
      return(
        <td className='hidden' key={`${row}_${column}`} style={{visibility: 'hidden'}}
        ></td>
      )
    } else if(row === 0 || column === 0) {
      let fOnClick = null;
      let visibility = (this.state.row === row || this.state.column === column) ? 'visible' : 'hidden'
      if(row === 0) {
        fOnClick = this.removeColumn.bind(this, column)
        if(this.state.table[0].length === 2) visibility = 'hidden'
      } else {
        fOnClick = this.removeRow.bind(this, row)
        if(this.state.table.length === 2) visibility = 'hidden'
      }
      return(
        <td className='hidden' onClick={fOnClick}
          style={{visibility: visibility}}
          key={`${row}_${column}`}
        > - </td>
      )
    } else {
      return(
        <td className='bordered' onMouseEnter={this.removeButtonShow.bind(this, row, column)}
        
          key={`${row}_${column}`}
        ></td>
      )
    }
  }

  addRow() {
    let rows = this.state.table.length - 1;
    let columns = this.state.table[rows - 1].length;
    let newTable = this.state.table.map(function(arr) {
      return arr.slice();
    });
    
    newTable.push(Array(columns).fill(''));
    this.setState({table: newTable});
  }

  addColumn() {
    let newTable = this.state.table.map(function(arr) {
      return arr.slice();
    });

    newTable.map(function(arr) {
      return arr.push('');
    })

    this.setState({table: newTable});
  }

  removeButtonShow(row, column) {
    this.setState({row: row, column: column});
  }

  removeButtonHide() {
    this.setState({row: null, column: null});
  }

  removeRow(row) {
    let newTable = this.state.table.map(function(arr) {
      return arr.slice();
    });

    newTable.splice(row, 1);
    this.setState({table: newTable});
  }

  removeColumn(column) {
    let newTable = this.state.table.map(function(arr) {
      return arr.slice();
    });
    
    newTable.map(function(arr){
      return arr.splice(column, 1);
    })
    this.setState({table: newTable});
  }

  render() {
    let rows = [];
    let table_size = this.state.table.length;

    this.state.table.forEach(function(row, row_number) { 
      let columns = []
      row.forEach(function(column, column_number) {
        columns.push(
          this.createCell(row_number, column_number)  
        )
        if(column_number === row.length - 1 && row_number === 1) {
          columns.push(
            <td key='add_column_cell' className='add' onClick={this.addColumn.bind(this)}
            onMouseEnter={this.removeButtonHide.bind(this)}>
            +
            </td>
          )
        }
      }, this);

      rows.push(
        <tr key={row_number}>
          { columns }
        </tr>
      )
      
      if(row_number === table_size - 1) {
        rows.push(
        <tr key='add_row_row'>
          <td className='hidden' style={{visibility: 'hidden'}}></td>
          <td key='add_row_cell' className='add' onClick={this.addRow.bind(this)}
          onMouseEnter={this.removeButtonHide.bind(this)}>
          +
          </td>
        </tr>
        )
      }
    }, this);
    
    return (
      <div className="App">
        <table ref='table' id='originTable' onMouseLeave={this.removeButtonHide.bind(this)}>
          <tbody>
            { rows }
          </tbody>  
        </table> 
      </div>
    );
  }
}

export default App;