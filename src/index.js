import React from 'react'
import { render } from 'react-dom'

import './css/style.css';

render(
    React.createElement('h1', null, 'Привет, Мир!'),
    document.getElementById('root')
  );
