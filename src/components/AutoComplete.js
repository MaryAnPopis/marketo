import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import styled from 'styled-components'

import AutoCompleteProduct from './AutoCompleteProduct'
import { withStyles } from '@material-ui/core/styles'
import colors from '../style/colors'

import { getByParam } from '../services'

const suggestions = [
  {
    id: 9,
    name: 'Sony Playstation 4 Pro',
    price: 399.95,
    image:
      'https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2013/06/ps4-slim-gold-console-img-2.jpg',
  },
  {
    id: 10,
    name: 'Nintendo Switch',
    price: 299,
    image: 'https://i.imgur.com/KhXe2Ia.png',
  },
  {
    id: 11,
    name: 'Frankenstein',
    price: 7.99,
    image: 'https://images-na.ssl-images-amazon.com/images/I/51N%2B-E2eP6L._SY346_.jpg',
  },
  {
    id: 12,
    name: 'Battle Angel Alita Vol. 1',
    price: 8.99,
    image: 'https://images-na.ssl-images-amazon.com/images/I/51aAm32ywvL._SY346_.jpg',
  },
  {
    id: 13,
    name: 'Samsung Galaxy S9',
    price: 999.99,
    image:
      'https://http2.mlstatic.com/samsung-galaxy-s9-libre-64gb-garantia-oficial-12-meses-D_NQ_NP_628238-MLA28132314889_092018-F.jpg',
  },
  {
    id: 14,
    name: 'Apple iPhoneXS',
    price: 1000,
    image: 'https://i.imgur.com/dBF68HP.jpg',
  },
]

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep = count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

// How each suggested item will be rendered
function renderSuggestion(suggestion) {
  return (
    <AutoCompleteProduct
      id={suggestion.id}
      name={suggestion.name}
      imageSrc={suggestion.image}
      price={suggestion.price}
      alt={suggestion.name}
    />
  )
}

// What should be the input value (for the textbox), when a suggested item is selected
function getSuggestionValue(suggestion) {
  return suggestion.name
}

const styles = theme => ({
  container: { position: 'relative' },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: { display: 'block' },
  suggestionsList: { margin: 0, padding: 0, listStyleType: 'none' },
  input: {
    width: '93%',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '20px',
    color: colors.fontDark,
    letterSpacing: 'normal',
    padding: '0.9rem 1rem',
    border: 'solid 1px #DDDFE7',
    outline: 'transparent',
    textAlign: 'left',
    marginTop: '0.4rem',
    boxShadow: '0 2px 1px 0 rgba(0, 0, 0, 0.03)',
  },
})

export class AutoComplete extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      suggestions: [],
    }
  }

  onChange = (event, { newValue }) => this.setState({ value: newValue })

  // Grab new suggestions and load them into the state
  onSuggestionsFetchRequested = ({ value }) => {
    getByParam('products/search', value).then(list => {
      this.setState({ suggestions: list })
    })
  }

  // Clear all suggestions
  onSuggestionsClearRequested = () => this.setState({ suggestions: [] })

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: 'Search products…',
      onChange: this.onChange,
      value,
    }
    const { classes } = this.props
    return (
      <Autosuggest
        theme={{
          input: classes.input,
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default withStyles(styles)(AutoComplete)

const Style = {}

Style.Search = styled.div`
  padding: 2rem;
`
