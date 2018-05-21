# react-t-minus-timer
A countdown timer component for React

## Install

Install with npm:
```
npm install --save react-t-minus-timer
```

Install with yarn:
```
yarn add react-t-minus-timer
```

## Usage

**Basic Example**
```
import React from 'react'
import ReactDOM from 'react-dom'
import Timer from 'react-t-minus-timer'

ReactDOM.render(
  <Timer endTime='2018-06-01T00:00:00.000+07:00' />,
  document.getElementById('countdown_timer')
)
```

**Props**

| Name | Type | Default | Required? | Description |
| ---- | ---- | ------- | :-------: | ----------- |
| endTime | String | | ✓ | End time in ISO Format |
| separators | Object | ```{ day: ':', hour: ':', minute: ':', second: '' }``` | | Separator to display after each section |
