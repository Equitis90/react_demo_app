import React, { Component } from 'react';
import Cell from './Cell'
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [...Array(4).keys()].map(i => Array(4).fill('')),
      row: null,
      column: null
    };
  }

  createCell(row, column, type) {
    if(type === 'delete_row') {
      let visibility = this.state.row === row ? 'visible' : 'hidden'
      if(this.state.table.length === 1) visibility = 'hidden'
      return(
        <Cell className='remove' onClick={this.removeRow.bind(this, row)} 
          visibility={visibility} value='-'>
        </Cell>
      )
    } else if(type === 'delete_column') {
      let visibility = this.state.column === column ? 'visible' : 'hidden'
      if(this.state.table[0].length === 1) visibility = 'hidden'
      return(
        <Cell key={`remove_column_${column}`} className='remove' onClick={this.removeColumn.bind(this, column)} 
          visibility={visibility} value='-'>
        </Cell>
      )
    } else {  
      return(
        <Cell key={`${row}_${column}`} className='bordered' onMouseEnter={this.removeButtonShow.bind(this, row, column)} 
          value=''>
        </Cell>
      )
    }
  }

  addRow() {
    let rows = this.state.table.length - 1;
    let columns = this.state.table[rows].length;
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
    let del_column_cells = [];
    let del_row_cells = [];
    let empty_tds = [];
    let empty_trs = [];
    let table_length = this.state.table[0].length - 1
    let table_heigth = this.state.table.length - 1

    for(let i = 0; i < table_length; i++) {
      empty_tds.push(
        <td key={`empty_td_${i}`} className='add hidden'>
        </td>
      ) 
    }

    for(let i = 0; i < table_heigth; i++) {
      empty_trs.push(
        <tr key={`empty_tr_${i}`}>
          <td key={`empty_tr_td_${i}`} className='add hidden'></td>
        </tr> 
      ) 
    }

    this.state.table.forEach(function(row, row_number) { 
      let columns = []
      row.forEach(function(column, column_number) {
        columns.push(
          this.createCell(row_number, column_number, null)  
        )
        if(row_number === 0){
          del_column_cells.push(
            this.createCell(row_number, column_number, 'delete_column')  
          )
        }
      }, this);
      rows.push(
        <tr key={row_number}>
          { columns }
        </tr>
      )
      del_row_cells.push(
        <tr key={`del_${row_number}`}>
          {this.createCell(row_number, 0, 'delete_row')}
        </tr> 
      )
    }, this);

    return ( 
      <div className="App">
        <table id='mainTable' cellSpacing="0" onMouseLeave={this.removeButtonHide.bind(this)}>
          <tbody>
            <tr>
              <td className='hidden'>
              </td>
              <td>
                <table className='del_table_columns' cellPadding='0'>
                  <tbody>
                    <tr>
                      { del_column_cells }
                    </tr>  
                  </tbody>
                </table>
              </td>  
            </tr>
            <tr>
              <td className='hidden'>
                <table className='del_table_rows' cellSpacing="2">
                    <tbody>
                      { del_row_cells }
                    </tbody>
                </table>     
              </td>
              <td>
                <table id='originTable'>
                  <tbody>
                    { rows }
                  </tbody>
                </table>
              </td>
              <td>
                <table cellSpacing="0" className='add_column_table'>
                  <tbody>
                    <tr>
                      <Cell className='add' onClick={this.addColumn.bind(this)} 
                        onMouseEnter={this.removeButtonHide.bind(this)} value='+'>
                      </Cell>
                    </tr>  
                      { empty_trs }
                  </tbody>
                </table>  
              </td>        
            </tr>
            <tr>
              <td className='hidden'>
              </td>
              <td>
                <table cellSpacing="0" className='add_row_table'>
                  <tbody>
                    <tr>
                      <td key='add_row_cell' className='add' onClick={this.addRow.bind(this)}
                      onMouseEnter={this.removeButtonHide.bind(this)}>
                      +
                      </td>
                      { empty_tds }
                    </tr>  
                  </tbody>
                </table>
              </td>        
            </tr>
          </tbody>  
        </table> 
      </div>
    );
  }
}

export default App;