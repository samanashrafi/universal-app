import React, { Component } from 'react'

const Test = ({ match }) => (
    <div>
      <h3>Grand Child</h3>
      <div>{match.params.id}</div>
    </div>
  );


export default Test;