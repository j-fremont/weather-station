import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class MyFormCommand extends React.Component {

  checked = (status) => {
    if (status===this.props.command) {
      return true;
    } else {
      return false;
    }
  }

  render() {

    const onChecked = this.checked("on");
    const offChecked = this.checked("off");
    const autoChecked = this.checked("auto");

    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio_on" checked={onChecked} onClick={this.props.setOn} />
                {this.props.labels.on}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio_off" checked={offChecked} onClick={this.props.setOff} />
                {this.props.labels.off}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio_auto" checked={autoChecked} onClick={this.props.setAuto} />
                {this.props.labels.auto}
            </Label>
          </FormGroup>
        </FormGroup>
        <Button type="submit">Envoyer</Button>
      </Form>
    );
  }
}
