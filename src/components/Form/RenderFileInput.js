/*
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, {Component} from "react";
import {FormGroup, Label} from 'reactstrap';
import i18n from './../../i18n'

class RenderFileInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

  }
  handleChange(event) {
    // this is going to call setFieldValue and manually update values.fieldName
    this.props.onChange(this.props.fieldName, event.currentTarget.files[0]);
  }
  handleRemoveFile(event) {
    event.preventDefault();
    this.fileInput.value = "";
    this.props.onChange(this.props.fieldName, '');
  }
  handleBlur() {
    this.props.onBlur(this.props.fieldName, true);
  }
  render() {
    const {error, values, inputClass, inputClassError } = this.props;
    return (
      <FormGroup>
        <Label className="d-block">{i18n.t(this.props.label)} {this.props.requiredStar &&<span className="text-danger">*</span>} {this.props.warningStar && <span className="text-warning">*</span>}</Label>
        <div className={(error) ? inputClassError : inputClass}>
          <input type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange}
          onBlur={this.handleBlur} ref={ref=> this.fileInput = ref} />
          {!values &&
             <span className='nofile-selected'>{i18n.t('noFileSelected')}</span>}
          {values &&
           <button className="btn btn-link btn-sm text-danger" onClick={this.handleRemoveFile}>
                <i className="fa fa-close"></i>
            </button>}
        </div>
        {error && <div className="text-danger">{error}</div>}
      </FormGroup>
    )
  }
}

export default RenderFileInput;
