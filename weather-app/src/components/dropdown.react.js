import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class MyDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    const prevState = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !prevState
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Afficher
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Capteurs</DropdownItem>
          <DropdownItem onClick={() => this.props.changeMode('inside')}>Intérieur</DropdownItem>
          <DropdownItem onClick={() => this.props.changeMode('outside')}>Extérieur</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Commandes</DropdownItem>
          <DropdownItem onClick={() => this.props.changeMode('command')}>Commandes</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }


}
