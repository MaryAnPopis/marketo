import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import styled from 'styled-components'

import AutoCompleteProduct from './AutoCompleteProduct'
import { withStyles } from '@material-ui/core/styles'
import colors from '../style/colors'

import { getByParam } from '../services'

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
